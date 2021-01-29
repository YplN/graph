class Button {
  // constructor(x, y, t, f, s, tc, bc, w, h) {
  constructor(x, y, t, f, s, tc, bc, tcH, bcH) {
    this.x = x;
    this.y = y;
    this.text = t;
    this.font = f;
    this.size = s;
    this.textColor = tc;
    this.buttonColor = bc;
    this.textColorHover = tcH;
    this.buttonColorHover = bcH;
    // if (w && h) {
    //   this.width = w;
    //   this.height = h;
    // } else {
    let bbox = f.textBounds(t, 0, 0, s);
    this.width = bbox.w + 20;
    this.height = bbox.h + 20;
    // }
  }


  show() {
    rectMode(CORNER);
    strokeWeight(2);

    if (!this.isOn(mouseX, mouseY)) {
      stroke(this.textColor);
      fill(this.buttonColor);
    } else {
      stroke(this.textColorHover);
      fill(this.buttonColorHover);
    }
    rect(this.x, this.y, this.width, this.height, 10);

    textAlign(LEFT, BASELINE);
    textFont(this.font);
    textSize(this.size);
    noStroke();

    if (!this.isOn(mouseX, mouseY)) {
      fill(this.textColor);
    } else {
      fill(this.textColorHover);
    }
    text(this.text, this.x + 10, this.y + this.height - 10);
  }

  isOn(x, y) {
    return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
  }
}