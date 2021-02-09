class Label {
  constructor(s, x, y) {
    this.text = s;
    this.size = 20;
    this.x = x;
    this.y = y;
    this.color = DEFAULT_COLOR;
    this.colorHover = color(255, 0, 0);
    this.font = menuFont;
    let bbox = this.font.textBounds(s, 0, 0, this.size);
    this.width = max(bbox.w, 20);
    this.height = bbox.h;
    this.angle = 0;
    this.rho = 30;
  }


  show() {

    if (showLabels) {
      textAlign(CENTER, CENTER);
      textSize(this.size);
      noStroke();

      if (!this.isOn(mouseX, mouseY)) {
        fill(this.color);
      } else {
        fill(this.colorHover);
      }

      angleMode(RADIANS);
      text(this.text, this.getExactLabelX(), this.getExactLabelY());

    }


  }

  setLabel(s, r, a) {
    this.text = s;
    this.rho = r;
    this.angle = a;
  }


  getExactLabelX() {
    return this.x + this.getExactLabelOffsetX();
  }

  getExactLabelOffsetX() {
    return this.rho * cos(this.angle);
  }

  getExactLabelY() {
    return this.y + this.getExactLabelOffsetY();
  }

  getExactLabelOffsetY() {
    return this.rho * sin(this.angle);
  }

  getTikzAngle() {
    // We need to make a function to compute the bottom left corner of the label because it is from where it is printed on tikz
    let cartesianX = this.getExactLabelOffsetX(); // - this.width / 2;
    let cartesianY = this.getExactLabelOffsetY() + this.height / 2;

    angleMode(RADIANS);
    return round(atan2(cartesianY, cartesianX) * 100) / 100;
  }


  getTikzRho() {
    let cartesianX = this.getExactLabelOffsetX(); // + this.width / 2;
    let cartesianY = this.getExactLabelOffsetY() + this.height / 2;

    return round(sqrt(cartesianX * cartesianX + cartesianY * cartesianY) * 100) / 100;
  }


  isOn(x, y) {
    let offsetX = this.getExactLabelOffsetX();
    let offsetY = this.getExactLabelOffsetY();
    return (x >= this.x + offsetX - this.width / 2 && x <= this.x + this.width / 2 + offsetX &&
      y >= this.y + offsetY - this.height / 2 && y <= this.y + this.height / 2 + offsetY);
  }

  move(x, y) {
    this.x = round(x * 100) / 100;
    this.y = round(y * 100) / 100;
  }

  translate(x, y) {
    this.x += round(x * 100) / 100;
    this.y += round(y * 100) / 100;
  }

  rotate(r) {
    this.angle += r;
  }

}