class Grid {
  constructor(i, c, m) {
    this.gap = i;
    this.color = c;
    this.isMagnetic = m;
  }

  show()
  {
      if(this.isMagnetic)
      {
        stroke(this.color);
        strokeWeight(0.15);
        for (var i = 0; i < width; i+=this.gap) {
          line(i, 0, i, height);
        }
        for (var i = 0; i < height; i+=this.gap) {
          line(0, i, width, i);
        }
      }
    }

    closestLine(x)
    {
      let xFloor = x - x%this.gap;
      if(x%this.gap < this.gap/2){
        return xFloor;
      }
      else {
        return xFloor + this.gap;
      }
    }

}
