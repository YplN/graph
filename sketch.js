let Vertices = [];
let Edges = [];
let data = new Data();


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
let latexCode;
let isLatexCodeShowing = false;

let shareButton;
let graphCode;
let isGraphCodeShowing = false;

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
// https: //stackoverflow.com/questions/20026502/prevent-mouse-wheel-scrolling-but-not-scrollbar-event-javascript/23606063
// window.addEventListener("wheel", e => e.preventDefault(), {
//   passive: false
// })

function preload() {
  menuFont = loadFont('assets/CaviarDreams.ttf');
}



function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight - 4);
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
  COLORS = [color(238, 83, 83), color(119, 124, 255), color(127, 204, 125), color(249, 229, 124), color(254, 166, 237), color(249, 174, 62), color(187, 101, 254), color(142, 244, 254), color(203, 164, 124), color(142, 254, 203), BACKGROUND_COLOR, DEFAULT_COLOR];
  COLOR_WIDTH = 0.6 * LATERAL_BAR_SIZE / 3;
  COLOR_HEIGHT = 30;

  //sizeSlider = new Slider(width + LATERAL_BAR_SIZE / 2, 0.6 * height, SLIDER_BAR_SIZE, 0.5, 3, true);
  sizeSlider = new Slider(width + LATERAL_BAR_SIZE * 0.1 - lateralBarOffsetX, 0.6 * height, SLIDER_BAR_SIZE, 0.5, 2, 1, true, BACKGROUND_COLOR, DEFAULT_COLOR, false);
  modeSlider = new Slider(0.02 * width, 0.9525 * height, 80, 0, 2, 1, true, DEFAULT_COLOR, BACKGROUND_COLOR, false);

  latexButton = new Button(10, 55, "Generate LaTeX", menuFont, 18, DEFAULT_COLOR, BACKGROUND_COLOR, BACKGROUND_COLOR, DEFAULT_COLOR, color(255), color(147, 59, 59), DEFAULT_COLOR, BACKGROUND_COLOR);
  grid = new Grid(50, DEFAULT_COLOR, true);

  shareButton = new Button(10, 10, "Share or Import Graph", menuFont, 18, DEFAULT_COLOR, BACKGROUND_COLOR, BACKGROUND_COLOR, DEFAULT_COLOR, color(255), color(147, 59, 59), DEFAULT_COLOR, BACKGROUND_COLOR);
  grid = new Grid(50, DEFAULT_COLOR, true);


  // window.location.href = "http://stackoverflow.com";

  // createGraph("?V=[[950,700,1,10],[700,400,1,10],[750,250,1,10],[850,200,1,10],[950,300,1,10],[1050,200,1,10],[1150,250,1,10],[1200,400,1,10]]&E=[[0,1,1,0,11],[1,2,1,0,11],[2,3,1,0,11],[3,4,1,0,11],[4,5,1,0,11],[5,6,1,0,11],[6,7,1,0,11],[7,0,1,0,11]]");

  // createGraph("?V=[[750,550,1,10],[850,350,0.73,0],[1000,500,0.73,0],[950,650,1,10],[700,650,1,10],[550,450,1,6],[700,300,1,10],[550,250,1,6],[400,550,1,6],[650,850,1,10],[900,750,0.5,3],[1150,850,0.5,3],[1200,500,1,10],[1050,250,0.73,0],[1600,350,1,10]]&E=[[0,1,0.73,0,0],[1,2,0.73,0,0],[2,3,0.73,0,0],[3,4,1,0,11],[4,5,1,0,6],[5,6,1,0,6],[6,0,1,0,11],[6,7,1,0,6],[7,8,1,0,6],[8,9,1,0,6],[9,10,0.5,0,3],[10,11,0.5,0,3],[11,12,0.5,0,3],[12,13,0.73,0,0],[13,1,0.73,0,0]]");
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
  // console.log("V : " + Vertices.length);
  // console.log("E : " + Edges.length);
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
  shareButton.show();

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

  // for (let v of Vertices) {
  //   console.log(v.inEdges());
  //   console.log(v.outEdges());
  //   console.log(v.incidentEdges());
  // }

  // if (frameCount % 30 == 0) {
  //   data.update(Vertices, Edges);
  //   console.log(JSON.stringify(data));
  // }

  // for (let v of Vertices) {
  //   console.log(v.toString());
  // }

  if (frameCount % 30 == 0) {
    // console.log(Vertices[0].codifyNode());
    // if (Edges.length > 0) {
    //   console.log(Edges[0].codifyNode());
    // }
    console.log(createCode());
  }

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
    for (let e of v.incidentEdges()) {
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
  for (let edge of u.incidentEdges()) {
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




function createLateX() {
  let latex = header();
  // defineColorsUsed();
  latex += "\\begin{document}\n	\\begin{tikzpicture}[yscale=-1]\n";
  latex += createCoordinates() + "\n";
  latex += createEdges() + "\n";
  latex += createNodes() + "\n";
  latex += "\n\t\\end{tikzpicture}\n\\end{document}\n";
  return latex;
}


function showLateXCode() {

  latexButton.text = "Exit LateX Code";
  latexButton.warningMode = true;


  let latex = createLateX();

  latexCode = createElement('textarea', latex);
  latexCode.id('latexcode')
  latexCode.position(100, 100);
  latexCode.size(width - 200, height - 200);
  var textAreaLatex = document.getElementById('latexcode');
  textAreaLatex.style.resize = "unset";
  textAreaLatex.style.color = "antiquewhite";
  textAreaLatex.style.background = "#191919";
  textAreaLatex.readOnly = "true";
}

function hideLateXCode() {
  latexCode.remove();
  latexButton.warningMode = false;
  latexButton.text = "Generate LaTeX";
}


function showGraphCode() {

  shareButton.text = "Import Graph Code";
  shareButton.warningMode = true;

  let code = createCode();

  graphCode = createElement('textarea', code);
  graphCode.id('graphcode');
  // graphCode.setAttribute("id", "graphcode")
  graphCode.position(100, 100);
  graphCode.size(width - 200, height - 200);
  var textAreaLatex = document.getElementById("graphcode");
  textAreaLatex.style.resize = "unset";
  textAreaLatex.style.color = "antiquewhite";
  textAreaLatex.style.background = "#191919";
}


function hideGraphCode() {
  let code = graphCode.value();

  if (isValidCode(code)) {
    createGraph(code);
  }
  graphCode.remove();
  shareButton.warningMode = false;
  shareButton.text = "Share or Import Graph";

}

// TODO: IMPROVE THIS FUNCTION
function isValidCode(code) {
  return code.length > 10;
}





function shuffleGraph() // Because why not?
{
  for (let v of Vertices) {
    let x = random(0.2 * width, 0.8 * width);
    let y = random(0.2 * height, 0.8 * height);

    v.move(x, y);
  }
}





function listifyFloats(s) {
  s = s.substring(1, s.length - 1);
  let l = s.split(",");

  let values = [];

  for (let f of l) {
    values.push(parseFloat(f));
  }

  return values;

}

function codifyVertices() {
  let code = "V=[";
  for (let v of Vertices) {
    code += v.codifyNode() + ",";
  }
  if (Vertices.length > 0)
    code = code.slice(0, -1);
  code += "]";

  return code;
}



function codifyEdges() {
  let code = "E=[";

  for (let e of Edges) {
    code += e.codifyNode() + ",";
  }
  if (Edges.length > 0)
    code = code.slice(0, -1);

  code += "]";
  return code;
}

function createCode() {
  let code = "?";
  code += codifyVertices() + "&";
  code += codifyEdges();

  return code;
}


function createGraph(code) {
  var searchParams = new URLSearchParams(code);
  var V = JSON.parse(searchParams.get("V"));
  var E = JSON.parse(searchParams.get("E"));

  Vertices = [];
  Edges = [];

  for (let v of V) {
    makeNodeOutOfList(v);
  }

  for (let e of E) {
    makeEdgeOutOfList(e);
  }
  // console.log("EDGES " + E, "\n VERTICES " + V);
  // console.log(JSON.parse(V));
}


function makeNodeOutOfList(L) {
  let x = L[0];
  let y = L[1];
  let size = L[2];
  let color = COLORS[L[3]];

  let v = new Vertex(x, y, size);
  v.setColor(color);
  Vertices.push(v);

}


function makeEdgeOutOfList(L) {
  let indexV1 = L[0];
  let indexV2 = L[1];
  let size = L[2];
  let oriented = true;
  if (L[3] == 0) {
    oriented = false;
  }
  let color = COLORS[L[4]];

  let e = new Edge(Vertices[indexV1], Vertices[indexV2], oriented);
  e.setColor(color);
  e.setSize(size);
  Edges.push(e);

}



//?V=[[950,700,1,10],[700,400,1,10],[750,250,1,10],[850,200,1,10],[950,300,1,10],[1050,200,1,10],[1150,250,1,10],[1200,400,1,10]]&E=[[0,1,1,0,11],[1,2,1,0,11],[2,3,1,0,11],[3,4,1,0,11],[4,5,1,0,11],[5,6,1,0,11],[6,7,1,0,11],[7,0,1,0,11]]