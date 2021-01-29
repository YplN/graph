class Vertex {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.edges = [];
    this.color = BACKGROUND_COLOR;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
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
      // fill(255, map(snapAnimationAlpha, 0, 100, 0, 70));
      angleMode(DEGREES);
      if (snapAnimation >= 100) {
        fill(255, 35 * cos(2 * snapAnimationAlpha) + 35);
        // circle(this.x, this.y, VERTEX_SNAP_SIZE * this.size * (sin(snapAnimationAlpha - 180) + 1));
        // fill(255, 75);
        circle(this.x, this.y, VERTEX_SNAP_SIZE * this.size * (sin(snapAnimationAlpha) + 1));

        // circle(this.x, this.y, VERTEX_SNAP_SIZE * this.size * (cos(snapAnimationAlpha + 90) + 1));
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
    this.x += x;
    this.y += y;
  }

  addEdge(e) {
    this.edges.push(e);

    // console.log(this.toString() + '++++++++');
    // for (e of this.edges) {
    // 	console.log(e.toString());
    // }
    // console.log('______');
  }

  isAnExtremity(e) {
    if (this === e.v1)
      return 1;
    if (this === e.v2)
      return 2;
    return;
  }

  setSize(s) {
    this.size = s;
  }


  clearEdge(e) {

    for (var i = this.edges.length - 1; i >= 0; i--) {
      if (this.edges[i].toKill) {
        this.edges.splice(i, 1);
      }
    }
  }

  clearEdges() {
    for (var i = this.edges.length - 1; i >= 0; i--) {
      if (this.edges[i].toKill) {
        this.edges.splice(i, 1);
      }
    }
    /*
		for (var i = this.edges.length - 1; i >= 0; i--) {
			if (this.isAnExtremity(this.edges[i]) == 1) {
				this.edges[i].v2.clearEdge(this.edges[i]);
			} else {
				this.edges[i].v1.clearEdge(this.edges[i]);
			}
		}
*/
    /*
		for (var i = Edges.length - 1; i >= 0; i--) {
			console.log(this.isAnExtremity(Edges[i]));
			if (this.isAnExtremity(Edges[i])) {
				console.log(Edges);
				Edges.splice(i, 1);
				print(Edges);
			}
		}
    */
  }

  kill() {
    for (let e of this.edges) {
      e.kill();
    }
    Vertices.splice(Vertices.indexOf(this), 1);
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }

  updateNeighbor(e, v) {
    let index = this.edges.includes(e);
    if (index > 0) {
      if (this.isAnExtremity(this.edges[index]) == 1) {
        this.edges[index].v2 = v;
      } else {
        this.edges[index].v1 = v;
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

  snap()
  {
    if(grid.isMagnetic)
    {
      this.move(grid.closestLine(this.x), grid.closestLine(this.y));
    }
  }


  tikzifyNode() {
    return "\\node[scale = " + this.size + ", nodes={white}{}{}{}] (v" + Vertices.indexOf(this) + ") at ( " + this.x / 100 + ", " + this.y / 100 + " ) {};"
  }

}
