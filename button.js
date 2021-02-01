class Button {
  // constructor(x, y, t, f, s, tc, bc, w, h) {
  constructor(x, y, t, f, s, tc, bc, tcH, bcH, tcw, bcw, tcHw, bcHw) {
    this.x = x;
    this.y = y;
    this.text = t;
    this.font = f;
    this.size = s;
    this.textColor = tc;
    this.buttonColor = bc;
    this.textColorHover = tcH;
    this.buttonColorHover = bcH;
    this.warningMode = false;
    this.textColorWarning = tcw;
    this.buttonColorWarning = bcw;
    this.textColorHoverWarning = tcHw;
    this.buttonColorHoverWarning = bcHw;

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
    let textColor = this.textColor;
    let buttonColor = this.buttonColor;
    let textColorHover = this.textColorHover;
    let buttonColorHover = this.buttonColorHover;
    if (this.warningMode) {
      textColor = this.textColorWarning;
      buttonColor = this.buttonColorWarning;
      textColorHover = this.textColorHoverWarning;
      buttonColorHover = this.buttonColorHoverWarning;
    }


    if (!this.isOn(mouseX, mouseY)) {
      stroke(textColor);
      fill(buttonColor);
    } else {
      stroke(textColorHover);
      fill(buttonColorHover);
    }
    rect(this.x, this.y, this.width, this.height, 10);

    textAlign(CENTER, BASELINE);
    textFont(this.font);
    textSize(this.size);
    noStroke();

    if (!this.isOn(mouseX, mouseY)) {
      fill(textColor);
    } else {
      fill(textColorHover);
    }
    text(this.text, this.x + this.width / 2, this.y + this.height - 10);
  }

  isOn(x, y) {
    return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
  }
}