class Slider {
  constructor(x, y, l, vMin, vMax, v, a, cL, cC, type) {
    this.x = x;
    this.y = y;
    this.length = l;
    this.value = v;
    this.minValue = vMin;
    this.maxValue = vMax;
    this.actived = a;
    this.colorLine = cL;
    this.colorCircle = cC;
    this.discrete = type;
  }

  show() {
    if (this.actived) {
      strokeWeight(LINE_STROKE);
      stroke(this.colorLine);
      line(this.x, this.y, this.x + this.length, this.y);

      noStroke();
      fill(this.colorLine);
      circle(this.x + map(this.value, this.minValue, this.maxValue, 0, this.length), this.y, 30);

      fill(this.colorCircle);
      circle(this.x + map(this.value, this.minValue, this.maxValue, 0, this.length), this.y, map(this.value, this.minValue, this.maxValue, 0, 25));
    }
  }

  getValue() {
    if (this.discrete) {
      return this.value > 0.5;
    }
    return this.value;
  }

  isOn(x, y) {
    return (x >= this.x - 30 && x <= this.x + this.length + 30 && abs(this.y - y) <= 30);
  }

  setValue(v) {
    if (this.discrete) {
      this.value = (1 + this.value) % (this.maxValue + 1);
    } else {
      if (v <= this.maxValue && v >= this.minValue)
        this.value = v;
    }

  }

  setCloserValue() {
    this.value = round(this.value);
  }

  next() {
    this.value = this.minValue + (round(this.value) + 1) % (this.maxValue + 1);
  }

  getValueFromPoint(x, y) {
    if (this.isOn(x, y)) {
      let vx = x - this.x
      if (this.discrete) {
        return vx > this.length / 2;
      }
      return map(vx, 0, this.length, this.minValue, this.maxValue);
    } else {
      return this.value;
    }
  }

  updatingSliderWithMouse() {
    this.setValue(this.getValueFromPoint(mouseX, mouseY));
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }





}