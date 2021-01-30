let Vertices = [];
let Edges = [];

let BACKGROUND_COLOR;
let DEFAULT_COLOR;
let FOCUSED_VERTEX_COLOR;
let FAKE_VERTEX_COLOR;
let VERTEX_DEFAULT_SIZE = 17;
let EDGE_DEFAULT_STROKE = 2;

let LINE_STROKE = 12;

let VERTEX_SNAP_SIZE = 20;
let snapAnimation = 0;
let snapAnimationAlpha = 0;
let dAlpha = 1.5;


let modern = true;
let creatingMode = true;
let creatingModeAnimation = false;
let creatingModeOffsetX = 0;

let lmouseX;
let lmouseY;
let lvertex;

let isCreatingEdge;
let isDeletingVertex;
let isDraggingVertex;
let mouseStartDraggingX;
let mouseStartDraggingY;
let isSelectioning = false;
let startSelectionX;
let startSelectionY;

let isCreatingCopy = false;


let focusedVertex;
let fakeVertex;
let selectedVertices = [];
let selectVertices = true;
let followingMouseVertex = null;

let fakeEdge;
let focusedEdge;
let selectedEdges = [];
let selectEdges = true;

let isFocusingEdge;

let oriented = false;

let sizeSlider;
let isDraggingSlider = false;

let modeSlider;

let lateralBar = false;
let animatingLateralBar = false;
let lateralBarOffsetX;
let LATERAL_BAR_SIZE;
let SLIDER_BAR_SIZE;


let menuFont;

let COLORS;
let COLOR_WIDTH;
let COLOR_HEIGHT;


let latexButton;

let grid;

let oneFrameMoreToDo = true;


// function to disable default menu on right click
// https://discourse.processing.org/t/using-right-mouse-without-context-menu/9379/3
document.oncontextmenu = function() {
  return false;
}

// function to prevent space bar from scrolling page
//https://stackoverflow.com/questions/22559830/html-prevent-space-bar-from-scrolling-page
window.addEventListener('keydown', function(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});


// function to disable mousewheel scrolling
// https://stackoverflow.com/questions/20026502/prevent-mouse-wheel-scrolling-but-not-scrollbar-event-javascript/23606063
window.addEventListener("wheel", e => e.preventDefault(), {
  passive: false
})

function preload() {
  menuFont = loadFont('assets/CaviarDreams.ttf');
}



function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  BACKGROUND_COLOR = color(25, 25, 25);
  DEFAULT_COLOR = color(250, 232, 207);
  FOCUSED_VERTEX_COLOR = color(237, 92, 92);
  FAKE_VERTEX_COLOR = color(255, 80);
  isCreatingEdge = false;
  isDeletingVertex = false;
  isDraggingVertex = false;
  isFocusingEdge = false;
  lvertex = null;
  focusedVertex = null;
  fakeVertex = null;
  fakeEdge = null;
  focusedEdge = null;
  LATERAL_BAR_SIZE = 0.2 * width;
  SLIDER_BAR_SIZE = 0.8 * LATERAL_BAR_SIZE;
  lateralBarOffsetX = 1;
  COLORS = [color(238, 83, 83), color(119, 124, 255), color(127, 204, 125), color(249, 229, 124), color(254, 166, 237), color(249, 174, 62), color(187, 101, 254), color(142, 244, 254), color(203, 164, 124), color(142, 254, 203), color(0), color(255)];
  COLOR_WIDTH = 0.6 * LATERAL_BAR_SIZE / 3;
  COLOR_HEIGHT = 30;

  //sizeSlider = new Slider(width + LATERAL_BAR_SIZE / 2, 0.6 * height, SLIDER_BAR_SIZE, 0.5, 3, true);
  sizeSlider = new Slider(width + LATERAL_BAR_SIZE * 0.1 - lateralBarOffsetX, 0.6 * height, SLIDER_BAR_SIZE, 0.5, 2, 1, true, BACKGROUND_COLOR, DEFAULT_COLOR, false);
  modeSlider = new Slider(0.02 * width, 0.9525 * height, 80, 0, 2, 1, true, DEFAULT_COLOR, BACKGROUND_COLOR, false);

  latexButton = new Button(10, 10, "Generate LaTeX", menuFont, 18, DEFAULT_COLOR, BACKGROUND_COLOR, BACKGROUND_COLOR, DEFAULT_COLOR);
  grid = new Grid(50, DEFAULT_COLOR, true);
}


function draw() {
  // put drawing code here
  background(BACKGROUND_COLOR);
  // console.log(frameCount);
  UpdateEgdes();

  grid.show();
  showGraph();
  // if (Edges.length > 0) {
  // 	console.log(Edges[0].distFrom(mouseX, mouseY));
  // }


  // if (frameCount % 100 == 0) {
  //   printEdges();
  //   console.log("V : " + Vertices.length);
  //   console.log("E : " + Edges.length);
  //
  // }
  // console.log(selectedEdges);
  // console.log(selectedVertices);

  drawLateralBar();
  //drawModeSelector();
  drawSelectionBox(mouseX, mouseY, startSelectionX, startSelectionY);

  updateSizeSlider();

  sizeSlider.show();

  showModeSelector();

  latexButton.show();

  showCreatingCopy();

  // console.log(snapAnimationAlpha);
  //let size = drawSlider();

  // if (size) {
  //   for (let v of selectedVertices) {
  //     v.setSize(size);
  //   }
  // }
  // noLoop();

  // if (animatingLateralBar || creatingModeAnimation) {
  //   loop();
  // }

  // if (oneFrameMoreToDo) {
  //   loop();
  // } else {
  //   noLoop();
  // }


  //  let textString = `azndoazndoanzdoanoda zd azidjiajzd oaj doadh auzhduahzdu ahiod ajzd ohazd auih zdjazo do
  //  jzdjazdjopa zda
  //  azd ajdâ zd
  //  (zd
  //   ajzdad az
  // d azdoa zd) => {
  //
  //  }`
  //  let bbox = menuFont.textBounds(textString, 10, 30, 12);
  //  fill(DEFAULT_COLOR);
  //  rect(bbox.x, bbox.y, bbox.w, bbox.h);
  //  textAlign(LEFT, TOP);
  //  textFont(menuFont);
  //  textSize(12);
  //  fill(0);
  //  text(textString, 10, 30);
}


function showCreatingCopy() {
  if (isCreatingCopy) {
    for (let v of selectedVertices) {
      v.translate(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
      v.show();
    }
    mouseStartDraggingX = mouseX;
    mouseStartDraggingY = mouseY;
  }
}

function showModeSelector() {
  modeSlider.show();

  textFont(menuFont);
  textAlign(LEFT, CENTER);
  textSize(20);
  noStroke();
  fill(DEFAULT_COLOR);
  let textString;
  if (selectEdges && selectVertices) {
    textString = "Edges + Vertices"
  } else if (selectEdges) {
    textString = "Edges";
  } else {
    textString = "Vertices";
  }
  text(textString, modeSlider.x + modeSlider.length + 20, 0.95 * height);


}

function showGraph() {

  for (let e of Edges) {
    e.show();
  }

  showCreatingEdges();


  for (let vertex of Vertices) {
    vertex.show();
  }
}


function showCreatingEdges() {



  if (isCreatingEdge) {
    snapAnimation = min(snapAnimation + 4, 100);

    // if (snapAnimationAlpha > 100) {
    //   dAlpha = -dAlpha;
    //   snapAnimationAlpha = 100;
    // }
    //
    // if (snapAnimationAlpha < 0) {
    //   dAlpha = -dAlpha;
    //   snapAnimationAlpha = 0;
    // }
    snapAnimationAlpha = (snapAnimationAlpha + dAlpha) % 90;
    // console.log(snapAnimationAlpha);


    //line(mouseX, mouseY, lmouseX, lmouseY);
    if (grid.isMagnetic) {
      fakeVertex = new Vertex(grid.closestLine(mouseX), grid.closestLine(mouseY), 1);
    } else {
      fakeVertex = new Vertex(mouseX, mouseY, 1);
    }

    if (keyIsPressed && keyCode == SHIFT) {
      for (let v of selectedVertices) {
        if (v != lvertex) { // just to prevent an ugly extra edge
          fakeEdge = new Edge(v, fakeVertex, oriented);
          fakeEdge.show();
        }
      }
    }
    fakeEdge = new Edge(new Vertex(lmouseX, lmouseY, 1), fakeVertex, oriented);
    fakeEdge.show();
    fakeVertex.show();
    fakeVertex = null;
    fakeEdge = null;
  }
}

function updateSizeSlider() {
  let size = 1;
  let commonSize = true;

  if (selectEdges) {
    if (selectedEdges.length > 0) {
      size = selectedEdges[0].size;
      for (let e of selectedEdges) {
        if (size != e.size) {
          commonSize = false;
          break;
        }
      }

    } else {
      if (Edges.length > 0) {
        size = Edges[0].size;
        for (let e of Edges) {
          if (size != e.size) {
            commonSize = false;
            break;
          }
        }
      }
    }

  }
  if (selectVertices) {
    if (selectedVertices.length > 0) {
      size = selectedVertices[0].size;
      for (let v of selectedVertices) {
        if (size != v.size) {
          commonSize = false;
          break;
        }
      }

    } else {
      if (Vertices.length > 0) {
        size = Vertices[0].size;
        for (let v of Vertices) {
          if (size != v.size) {
            commonSize = false;
            break;
          }
        }
      }
    }
  }


  if (!commonSize) {
    size = 1;
  }
  sizeSlider.setValue(size);
  sizeSlider.move(width + LATERAL_BAR_SIZE * 0.1 - lateralBarOffsetX, 0.6 * height);

  noStroke();
  textFont(menuFont);
  textAlign(CENTER, CENTER);
  fill(BACKGROUND_COLOR);
  textSize(height / 30);

  text('Size', width + LATERAL_BAR_SIZE / 2 - lateralBarOffsetX, 0.55 * height);

  text("x" + Math.round(sizeSlider.value * 100) / 100, width + LATERAL_BAR_SIZE / 2 - lateralBarOffsetX, 0.63 * height);


}

function modeClicked(x, y) {
  return (abs(0.02 * width - x) < 0.055 * width && abs(0.9525 * height - y) < 30);
}


// function drawModeSelector() {
//   strokeWeight(LINE_STROKE);
//   stroke(DEFAULT_COLOR);
//   line(0.02 * width, 0.9525 * height, 0.055 * width, 0.9525 * height);
//   textFont(menuFont);
//   textAlign(LEFT, CENTER);
//   textSize(20);
//   noStroke();
//   fill(DEFAULT_COLOR);
//
//   if (creatingModeAnimation) {
//     if (creatingMode) {
//       creatingModeOffsetX -= 5;
//       if (creatingModeOffsetX <= 0) {
//         creatingModeOffsetX = 0;
//         creatingModeAnimation = false;
//       }
//     } else {
//       creatingModeOffsetX += 5;
//       if (creatingModeOffsetX >= 0.035 * width) {
//         creatingModeOffsetX = 0.035 * width;
//         creatingModeAnimation = false;
//       }
//
//     }
//   }
//
//   if (creatingMode) {
//     text("Creating", 0.07 * width, 0.95 * height);
//     circle(0.02 * width + creatingModeOffsetX, 0.9525 * height, 30);
//   } else {
//     text("Moving", 0.07 * width, 0.95 * height);
//     circle(0.02 * width + creatingModeOffsetX, 0.9525 * height, 30);
//   }
//   fill(BACKGROUND_COLOR);
//   circle(0.02 * width + creatingModeOffsetX, 0.9525 * height, map(creatingModeOffsetX, 0, 0.035 * width, 0, 25));
//
//
// }

function drawLateralBar() {
  if (animatingLateralBar || lateralBar) {
    noStroke();
    fill(DEFAULT_COLOR);
    lateralBarOffsetX *= 1.4;

    if (lateralBarOffsetX >= LATERAL_BAR_SIZE) {
      lateralBarOffsetX = LATERAL_BAR_SIZE;
      lateralBar = true;
      animatingLateralBar = false;
    }

    rectMode(CORNER);

    rect(width - lateralBarOffsetX, 0, LATERAL_BAR_SIZE, height);

    if (lateralBar) {
      fill(BACKGROUND_COLOR);
      textFont(menuFont);
      textAlign(CENTER, CENTER);

      drawMenuTitle();
      drawColorChoices();

      // noLoop();
    }
  }
}

function drawSlider() {
  if (animatingLateralBar || lateralBar) {
    strokeWeight(LINE_STROKE);
    stroke(BACKGROUND_COLOR);
    line(width + LATERAL_BAR_SIZE / 2 - lateralBarOffsetX - SLIDER_BAR_SIZE / 2, 0.6 * height, width + LATERAL_BAR_SIZE / 2 - lateralBarOffsetX + SLIDER_BAR_SIZE / 2, 0.6 * height);

    noStroke();
    textFont(menuFont);
    textAlign(CENTER, CENTER);
    fill(BACKGROUND_COLOR);
    textSize(height / 30);

    text('Size', width + LATERAL_BAR_SIZE / 2 - lateralBarOffsetX, 0.55 * height);

    let size = 1;
    if (selectedVertices.length > 0) {
      size = selectedVertices[0].size;
      let commonSize = true;
      for (let v of selectedVertices) {
        if (size != v.size) {
          commonSize = false;
          break;
        }
      }
      if (!commonSize) {
        size = 1;
      }
    }


    text("x" + size, width + LATERAL_BAR_SIZE / 2 - lateralBarOffsetX, 0.63 * height);
    circle(width + LATERAL_BAR_SIZE / 2 - lateralBarOffsetX - SLIDER_BAR_SIZE / 2 + map(size, 0.5, 3, 0, SLIDER_BAR_SIZE), 0.6 * height, 30);

    fill(DEFAULT_COLOR);
    circle(width + LATERAL_BAR_SIZE / 2 - lateralBarOffsetX - SLIDER_BAR_SIZE / 2 + map(size, 0.5, 3, 0, SLIDER_BAR_SIZE), 0.6 * height, map(size, 0.5, 3, 0, 30));

    return size;
  }

}


function drawMenuTitle() {
  push();
  translate(width - lateralBarOffsetX, 0);
  textSize(height / 20);
  text('Menu', LATERAL_BAR_SIZE / 2, height * 0.07);
  pop();
}


function colorPositionX(i, j) {
  return 0.2 * LATERAL_BAR_SIZE + (0.9 * LATERAL_BAR_SIZE * j) / 3;
}

function colorPositionY(i, j) {
  return 0.32 * height + i * 40;
}


function colorPicked(x, y) {
  if (lateralBar) {
    let color = null;

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        if (abs(x - colorPositionX(i, j) - (width - lateralBarOffsetX)) < COLOR_WIDTH / 2 && (abs(y - colorPositionY(i, j)) < COLOR_HEIGHT / 2)) {
          console.log(i, j);
          return COLORS[i * 3 + j];
        }
      }
    }

  } else {
    return;
  }

}


function drawColorChoices() {

  push();
  translate(width - lateralBarOffsetX, 0);
  textSize(height / 30);

  text('Color', LATERAL_BAR_SIZE / 2, 0.25 * height);

  rectMode(CENTER);
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      stroke(BACKGROUND_COLOR);
      strokeWeight(2);

      fill(COLORS[i * 3 + j]);
      rect(colorPositionX(i, j), colorPositionY(i, j), COLOR_WIDTH, COLOR_HEIGHT);
    }
  }

  pop();
}


function UpdateEgdes() {
  for (let i = Edges.length - 1; i >= 0; i--) {
    if (Edges[i].toKill) {
      Edges.splice(i, 1);
    }
  }
}







function printEdges() {
  for (let e of Edges) {
    console.log(e.toString());
  }
}

function VertexPicked(x, y) {
  for (let i = Vertices.length - 1; i >= 0; i--) {
    if (Vertices[i].isOn(mouseX, mouseY)) {
      return Vertices[i];
    }
  }
  return;
}


function VertexPickedNotV(x, y, v) {
  for (let i = Vertices.length - 1; i >= 0; i--) {
    if (Vertices[i] != v && Vertices[i].isOn(mouseX, mouseY)) {
      return Vertices[i];
    }
  }
  return;
}

function selectVerticesFromBox(x1, y1, x2, y2) {
  let xs = min(x1, x2);
  let ys = min(y1, y2);

  let xe = max(x1, x2);
  let ye = max(y1, y2);

  let sel = [];
  for (let v of Vertices) {
    if (v.x >= xs && v.x <= xe && v.y >= ys && v.y <= ye) {
      sel.push(v);
    }
  }
  return sel;
}

function updateSelectMode() {
  switch (modeSlider.value) {
    case 0:
      selectEdges = true;
      selectVertices = false;
      break;
    case 1:
      selectEdges = true;
      selectVertices = true;
      break;
    case 2:
      selectEdges = false;
      selectVertices = true;
      break;
  }
}

function selectEdgesFromBox(x1, y1, x2, y2) {
  let minX = min(x1, x2);
  let minY = min(y1, y2);

  let maxX = max(x1, x2);
  let maxY = max(y1, y2);

  let w = maxX - minX;
  let h = maxY - minY;

  let sel = [];


  for (let e of Edges) {
    let x1 = e.v1.x;
    let y1 = e.v1.y;
    let x2 = e.v2.x;
    let y2 = e.v2.y;


    let dy = y2 - y1;
    if (y2 == y1) // just in case of infinite slope
    {
      dy = 0.000001;
    }

    let dx = x2 - x1;
    if (x2 == x1) // just in case of infinite slope
    {
      dx = 0.000001;
    }

    let m = dy / dx;
    let p = y1 - m * x1;
    // console.log(slope);
    // if (abs(slope * w / 2) < h / 2 || abs((h / 2) / slope) < w / 2) {
    //   sel.push(e);
    //   console.log(e.toString());
    // }

    // x coordinate of the intersection between the (infinite) line
    // going from the extremities of the edges and the rectangle
    let xiBottom = (maxY - p) / m;
    // y coordinate on the line when the x coordinate is xiBottom
    let yiBottom = m * xiBottom + p;
    // so the edge intersect the bottom side of the rectangle if :
    // the infinite line cut at some point the rectangle
    // (minX <= xiBottom && xiBottom <= maxX && min(y1, y2)
    // where the y-coordinate of the rectangle at xiBottom
    // is ON the edge
    // (min(y1, y2) <= yiBottom && yiBottom <= max(y1, y2))


    // we do the same for the other sides of the rectangle
    let xiTop = (minY - p) / m;
    let yiTop = m * xiTop + p;

    let yiLeft = m * minX + p;
    let xiLeft = (yiLeft - p) / m;

    let yiRight = m * maxX + p;
    let xiRight = (yiRight - p) / m;

    // we also have to add the case where the edge is totally INSIDE the rectangle

    if ((minX <= xiBottom && xiBottom <= maxX && min(y1, y2) <= yiBottom && yiBottom <= max(y1, y2)) ||
      (minX <= xiTop && xiTop <= maxX && min(y1, y2) <= yiTop && yiTop <= max(y1, y2)) ||
      (minY <= yiLeft && yiLeft <= maxY && min(x1, x2) <= xiLeft && xiLeft <= max(x1, x2)) ||
      (minY <= yiRight && yiRight <= maxY && min(x1, x2) <= xiRight && xiRight <= max(x1, x2)) ||
      (minX <= min(x1, x2) && max(x1, x2) <= maxX && minY <= min(y1, y2) && max(y1, y2) <= maxY)) {
      sel.push(e);
      // console.log(e.toString());
    }
  }
  return sel;

}

function selectedEdgesFromSelectedVertices() {
  sel = []
  for (let v of selectedVertices) {
    for (let e of v.edges) {
      if (!sel.includes(e))
        sel.push(e);
    }
  }
  return sel;
}

function addNewVertex(x, y) {
  lvertex = new Vertex(x, y, 1);
  Vertices.push(lvertex);
  lmouseX = mouseX;
  lmouseY = mouseY;
}

function drawSelectionBox(x1, y1, x2, y2) {
  if (isSelectioning) {
    let xd = min(x1, x2);
    let yd = min(y1, y2);

    // noFill();
    fill(255, 10);
    stroke(DEFAULT_COLOR);
    strokeWeight(2);

    rect(xd, yd, abs(x1 - x2), abs(y1 - y2));
  }
}


function centerVertices() {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (let v of Vertices) {
    minX = min(minX, v.x);
    minY = min(minY, v.y);
    maxX = max(maxX, v.x);
    maxY = max(maxY, v.y);
  }

  let vWidth = maxX - minX;
  let vHeight = maxY - minY;

  if (vWidth <= width && vHeight <= height) {
    for (let v of Vertices) {
      v.translate((width - vWidth) / 2 - minX, (height - vHeight) / 2 - minY);
    }
  }
}



function rotateVertices(V, r) {
  let xAv = 0;
  let yAv = 0;

  for (let v of V) {
    xAv += v.x;
    yAv += v.y;
  }

  xAv = xAv / V.length;
  yAv = yAv / V.length;

  angleMode(RADIANS);
  for (let v of V) {
    //https://stackoverflow.com/questions/20104611/find-new-coordinates-of-a-point-after-rotation
    v.move((v.y - yAv) * sin(r) + (v.x - xAv) * cos(r) + xAv, (v.y - yAv) * cos(r) - (v.x - xAv) * sin(r) + yAv);
  }

}




function createNewEdge(u, v) {
  if (u == v)
    return;
  // TODO: ORIENTED CASE
  for (let edge of u.edges) {
    if (v.isAnExtremity(edge))
      return;
  }
  let e = new Edge(u, v, oriented);
  if (!Edges.includes(e)) {
    Edges.push(e);
    e.tellVertices();

  }
}


function copySelection() {

  // We check there's something to copy
  if (selectedVertices.length > 0) {
    let newVertices = [];
    let oldVerticesCorrespondance = []; // get a correspondance between the old and new vertices

    for (var i = 0; i < selectedVertices.length; i++) {
      let v = selectedVertices[i];
      let newVertex = new Vertex(v.x, v.y, v.size);
      Vertices.push(newVertex);
      newVertices.push(newVertex);
      oldVerticesCorrespondance.push(i);
    }

    oldEdgesFromSelectedVertices = selectedEdgesFromSelectedVertices();


    for (let e of oldEdgesFromSelectedVertices) {
      let v1 = e.v1;
      let v2 = e.v2;

      let i1 = selectedVertices.indexOf(v1);
      let i2 = selectedVertices.indexOf(v2);

      if (i1 >= 0 && i2 >= 0) // We check that both vertices are selected
      {
        let newI1 = oldVerticesCorrespondance[i1];
        let newI2 = oldVerticesCorrespondance[i2];

        // we get there corresponding new vertices thanks to our correspondance array
        let newV1 = newVertices[newI1];
        let newV2 = newVertices[newI2];

        let newE = new Edge(newV1, newV2, e.oriented);

        if (!Edges.includes(newE)) {
          Edges.push(newE);
          newE.tellVertices();
        }
      }

    }

    // We update the new selected vertices to the created ones
    selectedVertices = newVertices;
    isCreatingCopy = true;

    // we pick a representent among the copies which will follow the mouse for the paste
    followingMouseVertex = selectedVertices[0];
    let dx = mouseX - followingMouseVertex.x;
    let dy = mouseY - followingMouseVertex.y;

    mouseStartDraggingX = mouseX;
    mouseStartDraggingY = mouseY;

    for (let v of selectedVertices) {
      v.translate(dx, dy);
    }
  }
}