function mousePressed() {
  // loop();
  oneFrameMoreToDo = true;

  // Reset dragging booleans
  isCreatingEdge = false;
  isDraggingVertex = false;
  isSelectioning = false;
  isDraggingSlider = false;


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





  } else {
    if (!isLatexCodeShowing) {
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
                  if (!selectedVertices.includes(v)) {
                    selectedVertices = [v];
                    selectedEdges = [];
                    // } else if (!selectedVertices.includes(v)) {
                    //   selectedVertices = [v];
                    // }
                  }
                }

                //  else {
                //   if (!selectedVertices.includes(v) || selectedVertices.length > 1) {
                //     selectedVertices = [v];
                //   } else {
                //     selectedVertices = [];
                //   }
                // }
              } else {
                // if (selectedVertices.indexOf(v) < 0) {
                //   selectedVertices = [v];
                // } else {
                //   selectedVertices = [];
                // }
                if (mouseButton == LEFT) {
                  // Create a new edge if there is a drag
                  isCreatingEdge = true;
                }
              }

            }
          } else // the user didn't click on a vertex
          {
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

  //console.log(lvertex);

}


function mouseDragged() {
  if (isDraggingVertex) {
    // mouseStartDraggingX = mouseX - mouseStartDraggingX;
    // mouseStartDraggingY = mouseY - mouseStartDraggingY;
    for (let v of selectedVertices) {
      //console.log(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
      //v.move(mouseX, mouseY);

      // v.translate(mouseX - pmouseX, mouseY - pmouseY);
      v.translate(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
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
            v.size = size;
          }
        } else {
          for (let v of Vertices) {
            v.size = size;
          }
        }
      }
      if (selectEdges) {
        if (selectedEdges.length > 0) {
          for (let e of selectedEdges) {
            e.size = size;
          }
        } else {
          for (let e of Edges) {
            e.size = size;
          }
        }
      }

    } else if (modeSlider.isOn(mouseX, mouseY) && !modeSlider.discrete) {
      modeSlider.updatingSliderWithMouse();
      modeSlider.setCloserValue();
    }
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

  // noLoop();
  // oneFrameMoreToDo = false;
}


function keyPressed() {
  // loop();

  if (!isLatexCodeShowing) {
    if (keyCode == DELETE || keyCode == BACKSPACE) {
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
      selectedEdges = [];
      selectedVertices = [];
    }

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

    if (key == 'c' || key == 'C') {
      if (keyIsDown(17) && !isLatexCodeShowing) {
        copySelection();
      } else {
        centerVertices();
      }

    }

    if (key == 'g') {
      grid.isMagnetic = !grid.isMagnetic;
    }

    if (key == 's') {
      if (keyIsDown(18)) // Alt
        shuffleGraph();
    }

  } else {

    if (keyCode == ESCAPE) {
      hideLateXCode();
      isLatexCodeShowing = false;
    }

  }


}





function mouseWheel(event) {

  if (!isLatexCodeShowing) {

    if (event.delta > 0) {
      rotateVertices(selectedVertices, PI / 10);
    } else {
      rotateVertices(selectedVertices, -PI / 10);

    }
  }
}