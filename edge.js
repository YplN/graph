class Edge {
  // constructor(v1, v2) {
  //   this.v1 = v1;
  //   this.v2 = v2;
  //   this.toKill = false;
  //   this.color = DEFAULT_COLOR;
  //   this.oriented = true;
  // }

  constructor(v1, v2, o) {
    this.v1 = v1;
    this.v2 = v2;
    this.toKill = false;
    this.color = DEFAULT_COLOR;
    this.oriented = o;
    this.size = 1;

    this.oX = (v2.x + v1.x) / 2;
    this.oY = (v2.y + v1.y) / 2;

    this.label = new Label(nf(random(50), 2, 0), this.getMidPointX(), this.getMidPointY());
    // this.v1arc

  }

  updateLabelPosition() {
    this.label.move(this.getMidPointX(), this.getMidPointY());
  }

  kill() {
    this.toKill = true;
  }

  setColor(c) {
    this.color = c;
  }

  setSize(s) {
    this.size = round(s * 100) / 100;
  }

  show() {
    if (modern) {
      strokeWeight(EDGE_DEFAULT_STROKE * this.size * 2 + 10);
      stroke(BACKGROUND_COLOR);
      // line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
      noFill();
      bezier(this.v1.x, this.v1.y, this.oX, this.oY, this.oX, this.oY, this.v2.x, this.v2.y);

    }
    if (selectedEdges.includes(this)) {
      stroke(FOCUSED_VERTEX_COLOR);
      strokeWeight(EDGE_DEFAULT_STROKE * this.size * 2);
      noFill();
      bezier(this.v1.x, this.v1.y, this.oX, this.oY, this.oX, this.oY, this.v2.x, this.v2.y);
      // line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
      if (this.oriented) {
        angleMode(RADIANS);
        push() //start new drawing state

        let x = this.oX;
        let y = this.oY;

        if (dist(this.oX, this.oY, this.v2.x, this.v2.y) < VERTEX_DEFAULT_SIZE * this.size / 2) { // if the bezier point is too close, we pick the v1 instead
          x = this.v1.x;
          y = this.v1.y;
        }

        let angle = atan2(y - this.v2.y, x - this.v2.x); //gets the angle of the line
        translate(this.v2.x, this.v2.y); //translates to the destination vertex
        rotate(angle - HALF_PI); //rotates the arrow point
        let offset = VERTEX_DEFAULT_SIZE * 0.75 * this.size;
        let adjust = VERTEX_DEFAULT_SIZE * 1.4 * this.size;
        strokeWeight(7);
        triangle(-offset * 0.5, offset + adjust, offset * 0.5, offset + adjust, 0, -offset / 2 + adjust); //draws the arrow point as a triangle
        pop();
      }
    }
    stroke(this.color);
    strokeWeight(EDGE_DEFAULT_STROKE * this.size);

    noFill();
    bezier(this.v1.x, this.v1.y, this.oX, this.oY, this.oX, this.oY, this.v2.x, this.v2.y);
    // line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);



    if (this.oriented) {
      //https://stackoverflow.com/questions/44874243/drawing-arrows-in-p5js
      push() //start new drawing state
      angleMode(RADIANS);
      // let angle = atan2(this.v1.y - this.v2.y, this.v1.x - this.v2.x); //gets the angle of the line
      let x = this.oX;
      let y = this.oY;

      if (dist(this.oX, this.oY, this.v2.x, this.v2.y) < VERTEX_DEFAULT_SIZE * this.size / 2) { // if the bezier point is too close, we pick the v1 instead
        x = this.v1.x;
        y = this.v1.y;
      }

      let angle = atan2(y - this.v2.y, x - this.v2.x); //gets the angle of the line
      translate(this.v2.x, this.v2.y); //translates to the destination vertex
      rotate(angle - HALF_PI); //rotates the arrow point
      let offset = VERTEX_DEFAULT_SIZE * 0.75 * this.size;
      let adjust = VERTEX_DEFAULT_SIZE * 1.4 * this.size;
      fill(this.color);
      triangle(-offset * 0.5, offset + adjust, offset * 0.5, offset + adjust, 0, -offset / 2 + adjust); //draws the arrow point as a triangle
      pop();
    }

    fill(FOCUSED_VERTEX_COLOR);
    if (isDraggingBendingPoint && this == ledge) {
      strokeWeight(1);
      stroke(200, 100);

      if (showBendings) {
        line(this.v1.x, this.v1.y, this.oX, this.oY);
        line(this.v2.x, this.v2.y, this.oX, this.oY);
      }
    }

    if (showBendings) {
      this.showBendingPoint();

    }

    this.label.show();
  }

  showBendingPoint() {
    circle(this.oX, this.oY, 9);
  }

  showMidPoint() {
    circle(this.getMidPointX(), this.getMidPointY(), 9);
  }

  translateBendingPoint(x, y) {
    this.oX += x;
    this.oY += y;

    this.updateLabelPosition();
  }

  isOnMidPoint(x, y) {
    return (dist(x, y, this.getMidPointX(), this.getMidPointY()) < VERTEX_SNAP_SIZE);
  }

  getMidPointX() {
    return bezierPoint(this.v1.x, this.oX, this.oX, this.v2.x, 0.5);
  }
  getMidPointY() {
    return bezierPoint(this.v1.y, this.oY, this.oY, this.v2.y, 0.5);
  }

  transformBendingPoint(vC, xS, yS, xE, yE) {
    let vS = {
      x: xS,
      y: yS
    };
    let vE = {
      x: xE,
      y: yE
    };

    let theta = getTheta(vC, vS, vE);
    let rho = getRho(vC, vS, vE);

    let newCoordinates = applyTransformation(theta, rho, vC, this.initialDraggingX, this.initialDraggingY);


    this.moveBendingPoint(newCoordinates[0], newCoordinates[1]);

  }

  resetBendingPoint() {
    this.oX = (this.v2.x + this.v1.x) / 2;
    this.oY = (this.v2.y + this.v1.y) / 2;
  }

  setBendingPoint(x, y) {
    this.oX = x;
    this.oY = y;

  }


  moveBendingPoint(x, y) {
    this.setBendingPoint(x, y);
    this.updateLabelPosition();
  }


  isOnBendingPoint(x, y) {
    return (dist(x, y, this.oX, this.oY) < VERTEX_SNAP_SIZE);
  }

  // updateBendingPoint(x, y) {
  //   this.oX = x;
  //   this.oY = y;
  //
  //   this.label.move(x, y);
  // }

  tellVertices() {
    this.v1.addEdge(this);
    this.v2.addEdge(this);
  }

  isEquals(e) {
    return (this.v1 === e.v1 && this.v2 === e.v2) || (this.v1 === e.v2 && this.v2 === e.v1);
  }

  toString() {
    return "{v1 :" + this.v1 + ", v2 :" + this.v2 + " }";
  }



  distFrom(x, y) {
    const x1 = this.v1.x;
    const y1 = this.v1.y;
    const x2 = this.v2.x;
    const y2 = this.v2.y;

    const den = dist(x1, y1, x2, y2);
    if (den == 0) {
      return;
    }
    const num = abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1))

    return num / den;
  }


  tikzifyEdge() {
    // TODO: ORIENTED CASE
    let labelCode = "";
    if (showLabels)
      labelCode = "node[midway, shift={(" + this.label.getExactLabelOffsetX() / 100 + "," + -this.label.getExactLabelOffsetY() / 100 + ")}, scale = 0.65] {" + this.label.text + "}";

    return "\\draw[line width = " + this.size + ", color = c" + COLORS.indexOf(this.color) +
      "] " + "(v" + Vertices.indexOf(this.v1) + ") .. controls (" + round(this.oX * 10) / 1000 + "," + round(this.oY * 10) / 1000 + ") .. (v" + Vertices.indexOf(this.v2) + ")" + labelCode + ";";
  }


  codifyNode() {
    let o = 0;
    if (this.oriented)
      o = 1;
    return "[" + Vertices.indexOf(this.v1) + "," + Vertices.indexOf(this.v2) + "," + this.size + "," + o + "," + COLORS.indexOf(this.color) + "," + this.oX + "," + this.oY + "," + this.label.rho + "," + this.label.angle + ",\"" + this.label.text + "\"]";
  }

}