function mousePressed() {
  // loop();
  oneFrameMoreToDo = true;

  // Reset dragging booleans
  isCreatingEdge = false;
  isDraggingVertex = false;
  isSelectioning = false;
  isDraggingSlider = false;
  isTranslating = false;




  // User clicked on Generate Latex?
  if (latexButton.isOn(mouseX, mouseY)) {

    // console.log(latex);
    if (!isLatexCodeShowing) {
      showLateXCode();
      isLatexCodeShowing = true;
    } else {
      hideLateXCode();
      isLatexCodeShowing = false;
    }




  } else if (shareButton.isOn(mouseX, mouseY)) {
    if (!isGraphCodeShowing) {
      showGraphCode();
      isGraphCodeShowing = true;
    } else {
      hideGraphCode();
      isGraphCodeShowing = false;
    }
  } else {
    if (!isLatexCodeShowing && !isGraphCodeShowing && !isEditingLabel) {
      // check if user toggled the mode
      if (modeSlider.isOn(mouseX, mouseY)) {
        modeSlider.updatingSliderWithMouse();
        isDraggingSlider = true;
      } else if (sizeSlider.isOn(mouseX, mouseY)) {
        sizeSlider.updatingSliderWithMouse();
        isDraggingSlider = true;
      } else {
        // check if the user clicked on a color
        let c = colorPicked(mouseX, mouseY);
        if (c) {
          for (let v of selectedVertices) {
            v.setColor(c);
          }
          for (let e of selectedEdges) {
            e.setColor(c);
          }
        } else if (mouseButton == CENTER) {
          isTranslating = true;
          mouseStartDraggingX = mouseX;
          mouseStartDraggingY = mouseY;
        } else {
          {
            let l = LabelPicked(mouseX, mouseY);

            if (l && !isEditingLabel) {
              createLabelArea(mouseX, mouseY, l);
              isEditingLabel = true;
              labelEdited = l;
            } else {


              // check if user clicked on a vertex
              let v = VertexPicked(mouseX, mouseY);

              if (v) {

                if (isCreatingCopy) {
                  if (grid.isMagnetic) {
                    for (let v of selectedVertices) {
                      v.translate(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
                      v.move(grid.closestLine(v.x), grid.closestLine(v.y));
                    }
                  } else {
                    for (let v of selectedVertices) {
                      v.translate(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
                    }
                  }
                  isCreatingCopy = false;
                  followingMouseVertex = null;
                  selectedEdges = selectedEdgesFromSelectedVertices();
                } else {

                  lvertex = v;
                  lmouseX = v.x;
                  lmouseY = v.y;
                  if (mouseButton == RIGHT) {
                    if (keyIsPressed) {
                      if (keyCode == CONTROL) {
                        let index = selectedVertices.indexOf(v);
                        if (index < 0) {
                          selectedVertices.push(v);
                        } else {
                          selectedVertices.splice(index, 1);
                        }
                      }
                    } else {
                      isDraggingVertex = true;
                      mouseStartDraggingX = mouseX;
                      mouseStartDraggingY = mouseY;
                      mouseStartDraggingFromBeginingX = mouseX;
                      mouseStartDraggingFromBeginingY = mouseY;
                      if (!selectedVertices.includes(v)) {
                        selectedVertices = [v];
                        selectedEdges = [];
                        // } else if (!selectedVertices.includes(v)) {
                        //   selectedVertices = [v];
                        // }
                      }


                      for (let v of selectedVertices) {
                        v.initialDraggingX = v.x;
                        v.initialDraggingY = v.y;
                      }

                      for (let e of Edges) {
                        e.initialDraggingX = e.oX;
                        e.initialDraggingY = e.oY;
                      }
                    }

                  } else {
                    if (mouseButton == LEFT) {
                      // Create a new edge if there is a drag
                      isCreatingEdge = true;
                    }
                  }

                }
              } else // the user didn't click on a vertex
              {
                let e = EdgeBendingPointPicked(mouseX, mouseY);

                if (e) {
                  isDraggingBendingPoint = true;
                  ledge = e;
                } else {
                  if (mouseButton == LEFT) {
                    if (grid.isMagnetic) {
                      addNewVertex(grid.closestLine(mouseX), grid.closestLine(mouseY));
                      lmouseX = grid.closestLine(mouseX);
                      lmouseY = grid.closestLine(mouseY);
                    } else {
                      addNewVertex(mouseX, mouseY);
                      lmouseX = mouseX;
                      lmouseY = mouseY;
                    }
                    isCreatingEdge = true;


                  } else {
                    selectedVertices = [];
                    selectedEdges = [];
                    isSelectioning = true;
                    startSelectionX = mouseX;
                    startSelectionY = mouseY;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  if (isEditingLabel && !labelEdited.isOn(mouseX, mouseY)) {
    closeLabelAreaAndUpdate(true);
  }

}


function mouseDragged() {
  if (isDraggingVertex) {

    let edgesDone = []; // to prevent a translation of middle point to be done twice
    for (let v of selectedVertices) {
      v.translate(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);

      for (let e of v.incidentEdges()) {
        if (!edgesDone.includes(e)) {
          let v1 = e.v1;
          let v2 = e.v2;

          let i1 = selectedVertices.includes(v1);
          let i2 = selectedVertices.includes(v2);

          if (i1 > 0 && i2 > 0) {
            e.translateBendingPoint(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
          } else if (i1 > 0) {
            e.transformBendingPoint(v2, v1.x, v1.y, v1.initialDraggingX, v1.initialDraggingY);
          } else {
            e.transformBendingPoint(v1, v2.x, v2.y, v2.initialDraggingX, v2.initialDraggingY);

          }
          edgesDone.push(e);
        }
      }
    }


    for (let e of selectedEdges) {
      //e.translateBendingPoint(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
      // let v1 = e.v1;
      // let v2 = e.v2;
      //
      // if (selectedVertices.includes(v1) && selectedVertices.includes(v2)) {
      //   e.translateBendingPoint(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
      // } else if (selectedVertices.includes(v1)) {
      //   console.log("2");
      //   e.transformBendingPoint(v2, mouseX, mouseY, mouseStartDraggingX, mouseStartDraggingY)
      // } else {
      //   console.log("1");
      //   e.transformBendingPoint(v1, mouseX, mouseY, mouseStartDraggingX, mouseStartDraggingY)
      // }

    }
    mouseStartDraggingX = mouseX;
    mouseStartDraggingY = mouseY;



  } else if (isSelectioning) {
    if (selectVertices) {
      selectedVertices = selectVerticesFromBox(startSelectionX, startSelectionY, mouseX, mouseY);
    }
    if (selectEdges) {
      selectedEdges = selectEdgesFromBox(startSelectionX, startSelectionY, mouseX, mouseY); //selectedEdgesFromSelectedVertices();
    }
    // selectedEdges = selectedEdgesFromSelectedVertices();
  } else if (isDraggingSlider) {
    if (sizeSlider.isOn(mouseX, mouseY)) {
      sizeSlider.updatingSliderWithMouse();
      let size = sizeSlider.getValue();
      if (selectVertices) {
        if (selectedVertices.length > 0) {
          for (let v of selectedVertices) {
            v.setSize(size);
          }
        } else {
          for (let v of Vertices) {
            v.setSize(size);
          }
        }
      }
      if (selectEdges) {
        if (selectedEdges.length > 0) {
          for (let e of selectedEdges) {
            e.setSize(size);
          }
        } else {
          for (let e of Edges) {
            e.setSize(size);
          }
        }
      }

    } else if (modeSlider.isOn(mouseX, mouseY) && !modeSlider.discrete) {
      modeSlider.updatingSliderWithMouse();
      modeSlider.setCloserValue();
    }
  } else if (isTranslating) {
    for (let v of Vertices) {
      v.translate(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
    }

    for (let e of Edges) {
      e.translateBendingPoint(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);

    }

    mouseStartDraggingX = mouseX;
    mouseStartDraggingY = mouseY;
  } else if (isDraggingBendingPoint) {
    ledge.moveBendingPoint(mouseX, mouseY);
  }

}


function mouseReleased() {
  if (isCreatingEdge) {
    let v = VertexPicked(mouseX, mouseY);
    if (!v) {
      if (grid.isMagnetic) {
        v = new Vertex(grid.closestLine(mouseX), grid.closestLine(mouseY), 1);
      } else {
        v = new Vertex(mouseX, mouseY, 1);
      }
      Vertices.push(v);
    }
    if (keyIsPressed && keyCode == SHIFT) {
      for (u of selectedVertices) {
        createNewEdge(u, v);
      }

    }
    createNewEdge(lvertex, v);
  } else if (isSelectioning) {
    // selectedVertices = selectVerticesFromBox(startSelectionX, startSelectionY, mouseX, mouseY);
    if (selectVertices) {
      selectedVertices = selectVerticesFromBox(startSelectionX, startSelectionY, mouseX, mouseY);
    }
    if (selectEdges) {
      selectedEdges = selectEdgesFromBox(startSelectionX, startSelectionY, mouseX, mouseY); //selectedEdgesFromSelectedVertices();
    }
  } else if (isDraggingVertex) {
    if (selectedVertices.length == 1) {
      let v = VertexPickedNotV(mouseX, mouseY, selectedVertices[0]);
      if (v) {
        v.merge(selectedVertices[0]);
        selectedVertices = [v];
      } else {
        if (grid.isMagnetic) {
          lvertex.move(grid.closestLine(mouseX), grid.closestLine(mouseY));
        }
      }
    } else {
      if (grid.isMagnetic) {
        for (let v of selectedVertices) {
          v.snap();
        }
      }
    }
  } else if (isDraggingSlider) {
    modeSlider.setCloserValue();
    updateSelectMode();

  }



  isSelectioning = false;
  isCreatingEdge = false;
  isDraggingVertex = false;
  lvertex = null;
  isDraggingSlider = null;
  snapAnimation = 0;
  snapAnimationAlpha = 0;
  isTranslating = false;
  isDraggingBendingPoint = false;
  ledge = false;

  // noLoop();
  // oneFrameMoreToDo = false;
}


function keyPressed() {
  // loop();


  if (!isLatexCodeShowing && !isGraphCodeShowing) {
    if ((keyCode == DELETE || keyCode == BACKSPACE) && !isEditingLabel) {
      for (let e of selectedEdges) {
        e.kill();
      }
      for (let v of selectedVertices) {
        v.kill();
      }
      selectedEdges = [];
      selectedVertices = [];
    }
    if (keyCode == ESCAPE) {
      if (isEditingLabel) {
        closeLabelAreaAndUpdate(false);
      } else {
        selectedEdges = [];
        selectedVertices = [];
      }
    }

    if (!isEditingLabel) {

      if (key == ' ') {
        modeSlider.next();
        updateSelectMode();
      }
      if (key == 'm' || key == 'M') {
        if (!lateralBar) {
          animatingLateralBar = true;
          lateralBarOffsetX = 1;
        } else {
          lateralBar = false;
          animatingLateralBar = false;
          lateralBarOffsetX = 1;
        }
      }

      if (key == 'o' || key == 'O') {
        oriented = !oriented;
      }

      if (key == 'b' || key == 'B') {
        showBendings = !showBendings;
      }

      if (key == 'c' || key == 'C') {
        if (keyIsDown(17) && !isLatexCodeShowing && !isGraphCodeShowing) {
          copySelection();
        } else {
          centerVertices();
        }

      }

      if (key == 'g' || key == 'G') {
        grid.isMagnetic = !grid.isMagnetic;
      }
      if (key == 'l' || key == 'L') {
        showLabels = !showLabels;
      }

      if (key == 's' || key == 'S') {
        if (keyIsDown(18)) // Alt
          shuffleGraph();
      }
    }

    if (keyCode == ENTER && isEditingLabel) {
      closeLabelAreaAndUpdate(true);
    }

  } else {

    if (keyCode == ESCAPE) {
      if (isLatexCodeShowing) {
        hideLateXCode();
        isLatexCodeShowing = false;
      }
      if (isGraphCodeShowing) {
        hideGraphCode();
        isGraphCodeShowing = false;
      }
    }

  }


}





function mouseWheel(event) {

  if (!isLatexCodeShowing && !isGraphCodeShowing) {

    let e = EdgeMidPointPicked(mouseX, mouseY);
    let v = VertexPicked(mouseX, mouseY);
    if (event.delta > 0) {

      if (e) {
        e.label.rotate(PI / 8);
      } else if (v) {
        v.label.rotate(PI / 8);
      } else {
        if (keyIsDown(16)) {
          rotateVertices(selectedVertices, PI / 8);
          // rotateBendingPoint(selectedEdges, selectedVertices, PI / 8);
        } else {
          zoomFrom(mouseX, mouseY, 1 / 1.1);
        }
      }

    } else {
      if (e) {

        e.label.rotate(-PI / 8);
      } else if (v) {
        v.label.rotate(-PI / 8);
      } else {
        if (keyIsDown(16)) {
          rotateVertices(selectedVertices, -PI / 8);
          // rotateBendingPoint(selectedEdges, selectedVertices, -PI / 8);
        } else {
          zoomFrom(mouseX, mouseY, 1.1);
        }
      }

    }
  }
}