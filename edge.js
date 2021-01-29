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
  }

  kill() {
    this.toKill = true;
  }

  setColor(c) {
    this.color = c;
  }

  show() {
    if (modern) {
      strokeWeight(EDGE_DEFAULT_STROKE * this.size * 2 + 10);
      stroke(BACKGROUND_COLOR);
      line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    }
    if (selectedEdges.includes(this)) {
      stroke(FOCUSED_VERTEX_COLOR);
      strokeWeight(EDGE_DEFAULT_STROKE * this.size * 2);
      line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
      if (this.oriented) {
        push() //start new drawing state
        let angle = atan2(this.v1.y - this.v2.y, this.v1.x - this.v2.x); //gets the angle of the line
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

    line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    if (this.oriented) {
      push() //start new drawing state
      let angle = atan2(this.v1.y - this.v2.y, this.v1.x - this.v2.x); //gets the angle of the line
      translate(this.v2.x, this.v2.y); //translates to the destination vertex
      rotate(angle - HALF_PI); //rotates the arrow point
      let offset = VERTEX_DEFAULT_SIZE * 0.75 * this.size;
      let adjust = VERTEX_DEFAULT_SIZE * 1.4 * this.size;
      fill(this.color);
      triangle(-offset * 0.5, offset + adjust, offset * 0.5, offset + adjust, 0, -offset / 2 + adjust); //draws the arrow point as a triangle
      pop();
    }
  }

  tellVertices() {
    this.v1.addEdge(this);
    this.v2.addEdge(this);
    // if (!this.v2.isAnExtremity(this)) {
    // 	this.v2.addEgde(this);
    // 	console.log("Oh");
    // } else {
    // 	console.log(this.toString());
    // }
    //
    // if (!this.v1.isAnExtremity(this)) {
    // 	this.v1.addEgde(this);
    // 	console.log("Oh");
    // }

    //console.log(this.v1.edges);
    //console.log(this.v2.edges);
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
    return "\\draw[line width = " + this.size + "] " + "(v" + Vertices.indexOf(this.v1) + ") -- (v" + Vertices.indexOf(this.v2) + ");";
  }
}