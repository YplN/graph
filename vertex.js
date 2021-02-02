class Vertex {
  constructor(x, y, size) {
    this.x = round(x * 100) / 100;
    this.y = round(y * 100) / 100;
    this.size = size;
    // this.edges = [];
    this.color = BACKGROUND_COLOR;
  }

  move(x, y) {
    this.x = round(x * 100) / 100;
    this.y = round(y * 100) / 100;
  }

  setColor(c) {
    this.color = c;
  }

  show() {
    if (modern) {
      noStroke();
      fill(BACKGROUND_COLOR);
      circle(this.x, this.y, VERTEX_DEFAULT_SIZE * this.size + 10);

    }

    if (isCreatingEdge) {
      noStroke();
      angleMode(DEGREES);
      if (snapAnimation >= 100) {
        fill(255, 20 * cos(2 * (snapAnimationAlpha) + 180) + 20);
        circle(this.x, this.y, VERTEX_SNAP_SIZE * this.size * (cos(snapAnimationAlpha) + 1));
      }


      fill(255, 35);
      circle(this.x, this.y, VERTEX_SNAP_SIZE * this.size * map(snapAnimation, 0, 100, 0.7, 2));
    }


    if (selectedVertices.includes(this)) {
      fill(FOCUSED_VERTEX_COLOR);
      circle(this.x, this.y, VERTEX_DEFAULT_SIZE * this.size * 1.5);
    } else if (this == fakeVertex) {
      stroke(FAKE_VERTEX_COLOR);
    } else {
      stroke(DEFAULT_COLOR);
    }
    strokeWeight(2);
    fill(this.color);
    circle(this.x, this.y, VERTEX_DEFAULT_SIZE * this.size);
  }

  isOn(x, y) {
    return (dist(x, y, this.x, this.y) < VERTEX_SNAP_SIZE * this.size * 2);
  }

  translate(x, y) {
    this.x += round(x * 100) / 100;;
    this.y += round(y * 100) / 100;;
  }

  addEdge(e) {
    // this.incidentEdges().push(e);
  }

  isAnExtremity(e) {
    if (this === e.v1)
      return 1;
    if (this === e.v2)
      return 2;
    return;
  }

  setSize(s) {
    this.size = round(s * 100) / 100;
  }

  inEdges() {
    let inE = [];
    for (let e of Edges) {
      if (this.isAnExtremity(e) == 2) {
        inE.push(e);
      }
    }
    return inE;
  }

  outEdges() {
    let outE = [];
    for (let e of Edges) {
      if (this.isAnExtremity(e) == 1) {
        outE.push(e);
      }
    }
    return outE;
  }

  incidentEdges() {
    return this.outEdges().concat(this.inEdges());
  }


  clearEdge(e) {
    let edges = this.incidentEdges();
    for (var i = edges.length - 1; i >= 0; i--) {
      if (edges[i].toKill) {
        edges.splice(i, 1);
      }
    }
  }

  clearEdges() {
    let edges = this.incidentEdges();
    for (var i = edges.length - 1; i >= 0; i--) {
      if (edges[i].toKill) {
        edges.splice(i, 1);
      }
    }
  }

  kill() {
    for (let e of this.incidentEdges()) {
      e.kill();
    }
    Vertices.splice(Vertices.indexOf(this), 1);
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }

  updateNeighbor(e, v) {
    let edges = this.incidentEdges();

    let index = edges.includes(e);
    if (index > 0) {
      if (this.isAnExtremity(edges[index]) == 1) {
        edges[index].v2 = v;
      } else {
        edges[index].v1 = v;
      }
    }
  }


  merge(v) {
    /*
    let mergedEdges = this.edges;
    let toUpdatedEdges = [];

    for (let e of v.edges) {
      if (!this.isAnExtremity(e)) {
        let neighbor;
        if (v.isAnExtremity(e) == 1) {
          neighbor = e.v2;
          let edge = new Edge(this, neighbor);
          mergedEdges.push(edge);
          Edges.push(edge);
        } else {
          neighbor = e.v1;
          let edge = new Edge(neighbor, this);
          mergedEdges.push(edge);
          Edges.push(edge);
        }
      } else {
        toUpdatedEdges.push(e);
      }
    }

    for (let e of toUpdatedEdges) {

    }

    this.edges = mergedEdges;
    v.kill();
*/
  }

  snap() {
    if (grid.isMagnetic) {
      this.move(grid.closestLine(this.x), grid.closestLine(this.y));
    }
  }
  tikzifyCoordinate() {
    return "\\coordinate (v" + Vertices.indexOf(this) + ") at ( " + round(this.x * 100) / 10000 + ", " + round(this.y * 100) / 10000 + " );"
  }


  tikzifyNode() {
    return "\\node[scale = " + this.size / 2 + ", nodes={white}{}{}{}] at  (v" + Vertices.indexOf(this) + ")  {};"
  }


  codifyNode() {
    return "[" + round(this.x * 100) / 100 + "," + round(this.y * 100) / 100 + "," + this.size + "," + COLORS.indexOf(this.color) + "]";
  }

}