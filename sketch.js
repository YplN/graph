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
let isTranslating = false;
let mouseStartDraggingX;
let mouseStartDraggingY;
let mouseStartDraggingFromBeginingX;
let mouseStartDraggingFromBeginingY;
let isSelectioning = false;
let startSelectionX;
let startSelectionY;

let isCreatingCopy = false;

let isDraggingBendingPoint = false;
let ledge;

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

let showLabels = true;
let isEditingLabel = false;
let labelEdited = null;
let labelArea;

let showBendings = false;

let counter = 0;



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

  initiateUI();

  grid = new Grid(50, DEFAULT_COLOR, false);


  // createGraph("?V=[[950,700,1,10],[700,400,1,10],[750,250,1,10],[850,200,1,10],[950,300,1,10],[1050,200,1,10],[1150,250,1,10],[1200,400,1,10]]&E=[[0,1,1,0,11],[1,2,1,0,11],[2,3,1,0,11],[3,4,1,0,11],[4,5,1,0,11],[5,6,1,0,11],[6,7,1,0,11],[7,0,1,0,11]]");

  // createGraph("?V=[[750,550,1,10],[850,350,0.73,0],[1000,500,0.73,0],[950,650,1,10],[700,650,1,10],[550,450,1,6],[700,300,1,10],[550,250,1,6],[400,550,1,6],[650,850,1,10],[900,750,0.5,3],[1150,850,0.5,3],[1200,500,1,10],[1050,250,0.73,0],[1600,350,1,10]]&E=[[0,1,0.73,0,0],[1,2,0.73,0,0],[2,3,0.73,0,0],[3,4,1,0,11],[4,5,1,0,6],[5,6,1,0,6],[6,0,1,0,11],[6,7,1,0,6],[7,8,1,0,6],[8,9,1,0,6],[9,10,0.5,0,3],[10,11,0.5,0,3],[11,12,0.5,0,3],[12,13,0.73,0,0],[13,1,0.73,0,0]]");

  // createGraph("?V=[[422,591.5,1,10],[292,357.5,1,10],[558,197.5,1,10],[802,459.5,1,10],[1071,294.5,1,10],[1138,659.5,1,10],[577,728.5,1,10]]&E=[[0,1,1,0,11,252,534.5],[1,2,1,0,11,378,179.5],[2,3,1,0,11,555,416.5],[3,4,1,0,11,898,296.5],[4,5,1,0,11,1207,418.5],[5,6,1,0,11,851,544.5],[6,0,1,0,11,559,585.5]]");

  //createGraph("?V=[[378.11,569.03,1,10],[1080.88,220.31,1,10],[761,694.34,1,10]]&E=[[0,1,1,0,11,609.7113161319014,213.65524999999982],[1,2,1,0,11,920.9449999999999,457.3297500000002],[2,0,1,0,11,569.56,631.6897500000002]]");

  //createGraph('?V=[[600,619,1,10],[924,222,1,10],[1200,604,1,10]]&E=[[0,1,1,0,11,687,376,30,0.7853981633974483,"19."],[1,2,1,0,11,978,457,30,-0.39269908169872414,"47."],[2,0,1,0,11,917,719,30,-1.5707963267948966,"32."]]');
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 4);
  initiateUI();
}



function initiateUI() { //sizeSlider = new Slider(width + LATERAL_BAR_SIZE / 2, 0.6 * height, SLIDER_BAR_SIZE, 0.5, 3, true);
  sizeSlider = new Slider(width + LATERAL_BAR_SIZE * 0.1 - lateralBarOffsetX, 0.6 * height, SLIDER_BAR_SIZE, 0.5, 2, 1, true, BACKGROUND_COLOR, DEFAULT_COLOR, false);
  modeSlider = new Slider(20, height - 20, 80, 0, 2, 1, true, DEFAULT_COLOR, BACKGROUND_COLOR, false);

  shareButton = new Button(10, 10, "Share or Load", menuFont, 18, DEFAULT_COLOR, BACKGROUND_COLOR, BACKGROUND_COLOR, DEFAULT_COLOR, color(255), color(147, 59, 59), DEFAULT_COLOR, BACKGROUND_COLOR);
  latexButton = new Button(20 + shareButton.width, 10, "Generate LaTeX", menuFont, 18, DEFAULT_COLOR, BACKGROUND_COLOR, BACKGROUND_COLOR, DEFAULT_COLOR, color(255), color(147, 59, 59), DEFAULT_COLOR, BACKGROUND_COLOR);


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
  drawSelectionBox(mouseX, mouseY, startSelectionX, startSelectionY);

  updateSizeSlider();

  sizeSlider.show();

  showModeSelector();

  latexButton.show();
  shareButton.show();

  showCreatingCopy();



  let e = EdgeBendingPointPicked(mouseX, mouseY);
  if (e) {
    e.showBendingPoint();
  }

  e = EdgeMidPointPicked(mouseX, mouseY);
  if (e) {
    e.showMidPoint();
  }

  // if (animatingLateralBar || creatingModeAnimation) {
  //   loop();
  // }

  // if (oneFrameMoreToDo) {
  //   loop();
  // } else {
  //   noLoop();
  // }


}


function showCreatingCopy() {
  if (isCreatingCopy) {
    for (let e of selectedEdges) {
      e.translateBendingPoint(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
      e.show();
    }
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
  text(textString, modeSlider.x + modeSlider.length + 20, modeSlider.y - 4);


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


function LabelPicked(x, y) {
  for (let i = Vertices.length - 1; i >= 0; i--) {
    if (Vertices[i].label.isOn(mouseX, mouseY)) {
      return Vertices[i].label;
    }
  }

  for (let i = Edges.length - 1; i >= 0; i--) {
    if (Edges[i].label.isOn(mouseX, mouseY)) {
      return Edges[i].label;
    }
  }


  return;
}

function EdgeBendingPointPicked(x, y) {
  for (let i = Edges.length - 1; i >= 0; i--) {
    if (Edges[i].isOnBendingPoint(mouseX, mouseY)) {
      return Edges[i];
    }
  }
  return;
}


function EdgeMidPointPicked(x, y) {
  for (let i = Edges.length - 1; i >= 0; i--) {
    if (Edges[i].isOnMidPoint(mouseX, mouseY)) {
      return Edges[i];
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


function solutionQuadratic(a, b, c) {

  if (b == 0 && a == 0) {
    return [];
  }

  if (a == 0) {
    return [-c / b];
  }

  let delta = b * b - 4 * a * c;
  if (delta > 0) {
    return [(-b + sqrt(delta)) / (2 * a), (-b - sqrt(delta)) / (2 * a)];
  }
  if (delta == 0) {
    return [-b / (2 * a)];
  }
  return [];
}


function bezierValue(t, p0, p1, p2) {
  // return (1.0 - t) * (1.0 - t) * p0 + 2.0 * (1.0 - t) * t * p1 + t * t * p2;
  return bezierPoint(p0, p1, p1, p2, t);
}





function selectEdgesFromBox(xA, yA, xB, yB) {
  let minX = min(xA, xB);
  let minY = min(yA, yB);

  let maxX = max(xA, xB);
  let maxY = max(yA, yB);

  let sel = [];


  for (let e of Edges) {

    let x0 = e.v1.x;
    let y0 = e.v1.y;
    let x1 = e.oX;
    let y1 = e.oY;
    let x2 = e.v2.x;
    let y2 = e.v2.y;


    // case where both vertices are already on the box
    if ((minX <= min(x0, x2) && max(x0, x2) <= maxX && minY <= min(y0, y2) && max(y0, y2) <= maxY)) {
      sel.push(e);
    } else {
      // we get the quadratic equation of the intersection of the bended edge and the sides of the box
      // https://en.wikipedia.org/wiki/B%C3%A9zier_curve

      let aX = (x2 + x0 - 2 * x1);
      let bX = 2 * (x1 - x0);
      let cXmin = x0 - minX;
      let cXmax = x0 - maxX;

      let aY = (y2 + y0 - 2 * y1);
      let bY = 2 * (y1 - y0);
      let cYmin = y0 - minY;
      let cYmax = y0 - maxY;

      // the candidates for the intersections
      let tXmin = solutionQuadratic(aX, bX, cXmin);
      let tXmax = solutionQuadratic(aX, bX, cXmax);
      let tYmin = solutionQuadratic(aY, bY, cYmin);
      let tYmax = solutionQuadratic(aY, bY, cYmax);

      let intersect = false;

      for (let t of tXmax.concat(tXmin)) { // we look for the candidates that are touching vertical sides
        if (t >= 0 && t <= 1) {
          let y = bezierValue(t, y0, y1, y2);
          if ((minY <= y && y <= maxY)) { // the candidate touches the box
            intersect = true;
            sel.push(e);
            break;
          }
        }
      }

      if (!intersect) {

        for (let t of tYmax.concat(tYmin)) {
          if (t >= 0 && t <= 1) {
            let x = bezierValue(t, x0, x1, x2);
            if ((minX <= x && x <= maxX)) {
              intersect = true;
              sel.push(e);
              break;
            }
          }
        }
      }
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
  // TODO: adapt zoom to the centering if the vertices are further ??
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

  for (let e of Edges) {
    minX = min(minX, e.oX);
    minY = min(minY, e.oY);
    maxX = max(maxX, e.oX);
    maxY = max(maxY, e.oY);
  }

  let vWidth = maxX - minX;
  let vHeight = maxY - minY;

  for (let v of Vertices) {
    v.translate((width - vWidth) / 2 - minX, (height - vHeight) / 2 - minY);
  }

  for (let e of Edges) {
    e.translateBendingPoint((width - vWidth) / 2 - minX, (height - vHeight) / 2 - minY);
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
    v.initialDraggingX = v.x;
    v.initialDraggingY = v.y;
    //https://stackoverflow.com/questions/20104611/find-new-coordinates-of-a-point-after-rotation
    v.move((v.y - yAv) * sin(r) + (v.x - xAv) * cos(r) + xAv, (v.y - yAv) * cos(r) - (v.x - xAv) * sin(r) + yAv);
  }

  for (let e of Edges) {
    e.initialDraggingX = e.oX;
    e.initialDraggingY = e.oY;
  }


  let edgesDone = []; // to prevent a translation of middle point to be done twice
  for (let v of V) {
    for (let e of v.incidentEdges()) {
      if (!edgesDone.includes(e)) {
        let v1 = e.v1;
        let v2 = e.v2;

        let i1 = V.includes(v1);
        let i2 = V.includes(v2);

        if (i1 > 0 && i2 > 0) {
          // e.translateBendingPoint(mouseX - mouseStartDraggingX, mouseY - mouseStartDraggingY);
          e.moveBendingPoint((e.oY - yAv) * sin(r) + (e.oX - xAv) * cos(r) + xAv, (e.oY - yAv) * cos(r) - (e.oX - xAv) * sin(r) + yAv);
        } else if (i1 > 0) {
          e.transformBendingPoint(v2, v1.x, v1.y, v1.initialDraggingX, v1.initialDraggingY);
        } else {
          e.transformBendingPoint(v1, v2.x, v2.y, v2.initialDraggingX, v2.initialDraggingY);

        }
        edgesDone.push(e);
      }
    }
  }

}


function rotateBendingPoint(E, V, r) {

  angleMode(RADIANS);
  let xAv = 0;
  let yAv = 0;

  for (let v of V) {
    xAv += v.x;
    yAv += v.y;
  }

  xAv = xAv / V.length;
  yAv = yAv / V.length;





  for (let e of E) {
    //https://stackoverflow.com/questions/20104611/find-new-coordinates-of-a-point-after-rotation
    e.moveBendingPoint((e.oY - yAv) * sin(r) + (e.oX - xAv) * cos(r) + xAv, (e.oY - yAv) * cos(r) - (e.oX - xAv) * sin(r) + yAv);
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

    let newEdges = [];
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
          newEdges.push(newE);
        }
      }

    }

    // We update the new selected vertices to the created ones
    selectedVertices = newVertices;
    selectedEdges = newEdges;
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

    for (let e of selectedEdges) {
      e.translateBendingPoint(dx, dy);
    }
  }
}




function createLateX() {
  let latex = preHeader() + "\n\n";
  latex += header();
  latex += defineColors();
  latex += "\\begin{document}\n	\\begin{tikzpicture}[yscale=-1]\n";
  latex += createDefines() + "\n";
  latex += createCoordinates() + "\n";
  latex += createEdges() + "\n";
  latex += createNodes() + "\n";
  latex += "\n\t\\end{tikzpicture}\n\\end{document}\n";
  return latex;
}


function createLabelArea(x, y, l) {
  l.toggle();
  let w = 30;
  let h = 20;
  labelArea = createElement('textarea', l.text);
  labelArea.id('labelArea')
  labelArea.position(mouseX - w / 2, mouseY - h / 2);
  labelArea.size(w, h);
  var textAreaLabel = document.getElementById('labelArea');
  textAreaLabel.style.resize = "unset";
  textAreaLabel.style.color = "antiquewhite";
  textAreaLabel.style.background = "#191919";
  textAreaLabel.style.textAlign = "center";
  textAreaLabel.focus();
}


function setNewLabelFromTextArea(b) {
  if (b) {
    labelEdited.text = labelArea.value();
  }
  labelEdited.printed = true;
  labelEdited = null;
}

function hideLabelArea() {
  labelArea.remove();
}


function closeLabelAreaAndUpdate(b) {
  setNewLabelFromTextArea(b);
  hideLabelArea();
  isEditingLabel = false;

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

  shareButton.text = "Import Graph";
  shareButton.warningMode = true;

  let code = createCode();

  graphCode = createElement('textarea', code);
  graphCode.id('graphcode');
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
  shareButton.text = "Share or Load";

}

// TODO: IMPROVE THIS FUNCTION
function isValidCode(code) {
  return code.length > 10;
}





function shuffleGraph() // Because why not?
{
  for (let v of Vertices) {
    let x = random(0.15 * width, 0.85 * width);
    let y = random(0.2 * height, 0.8 * height);

    v.move(x, y);
  }

  for (let e of Edges) {
    e.resetBendingPoint();
  }

  centerVertices();
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
}


function makeNodeOutOfList(L) {
  let x = L[0];
  let y = L[1];
  let size = L[2];
  let color = COLORS[L[3]];
  let labelRho = L[4];
  let labelAngle = L[5];
  let labelText = L[6];

  let v = new Vertex(x, y, size);
  v.setColor(color);
  v.label.setLabel(labelText, labelRho, labelAngle);
  Vertices.push(v);

}


function codifyLabel(s) {
  return s.replace('\\', '\\\\').replace("\"", "\\\"");
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
  let BendingPointX = L[5];
  let BendingPointY = L[6];
  let labelRho = L[7];
  let labelAngle = L[8];
  let labelText = L[9];


  let e = new Edge(Vertices[indexV1], Vertices[indexV2], oriented);
  e.setColor(color);
  e.setSize(size);
  e.moveBendingPoint(BendingPointX, BendingPointY);
  e.label.setLabel(labelText, labelRho, labelAngle);
  Edges.push(e);

}

function zoomFromToPoint(xs, ys, xp, yp, s) {
  angleMode(RADIANS);
  let rho = dist(xs, ys, xp, yp);
  let newRho = s * rho;

  let xM = (xp - xs);
  if (xp == xs) {
    xM = 0.000001;
  }
  let yM = (yp - ys);
  let angle = atan2(yM, xM);

  let xM2 = newRho * cos(angle);
  let yM2 = newRho * sin(angle);

  return [xM2 + xs, yM2 + ys];
}


function applyTransformation(theta, s, vC, vTX, vTY) {
  angleMode(RADIANS);
  let newvTX = (vTX - vC.x) * s * cos(theta) + (vTY - vC.y) * s * sin(theta) + vC.x;
  let newvTY = (vTY - vC.y) * s * cos(theta) - (vTX - vC.x) * s * sin(theta) + vC.y;



  return [newvTX, newvTY];

}

function getTheta(vC, vS, vE) {
  angleMode(RADIANS);
  let angle1 = atan2(vS.y - vC.y, vS.x - vC.x);
  let angle2 = atan2(vE.y - vC.y, vE.x - vC.x);

  // console.log(180 * (angle2 - angle1) / PI);
  return angle2 - angle1;
}


function getRho(vC, vS, vE) {
  let d1 = dist(vC.x, vC.y, vS.x, vS.y);
  let d2 = dist(vC.x, vC.y, vE.x, vE.y);

  // console.log(d1 / d2 * 100 + "%");
  return d1 / d2;
}





function zoomFrom(x, y, s) {
  for (let v of Vertices) {
    let newCoordinates = zoomFromToPoint(x, y, v.x, v.y, s);
    v.move(newCoordinates[0], newCoordinates[1]);
  }

  for (let e of Edges) {
    let newCoordinates = zoomFromToPoint(x, y, e.oX, e.oY, s);
    e.moveBendingPoint(newCoordinates[0], newCoordinates[1]);
  }

  // let newGridReferenceCoordinates = zoomFromToPoint(x, y, grid.referencePointX, grid.referencePointY, s);
  //
  // grid.referencePointX = newGridReferenceCoordinates[0];
  // grid.referencePointY = newGridReferenceCoordinates[1];
  //
  // grid.gap *= s;

}