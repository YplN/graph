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
    this.offsetX = 0;
    this.offsetY = -30;
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
      text(this.text, this.x + this.offsetX, this.y + this.offsetY);

    }

  }

  isOn(x, y) {
    return (x >= this.x + this.offsetX - this.width / 2 && x <= this.x + this.width / 2 + this.offsetX &&
      y >= this.y + this.offsetY - this.height / 2 && y <= this.y + this.height / 2 + this.offsetY);
  }

  move(x, y) {
    this.x = round(x * 100) / 100;
    this.y = round(y * 100) / 100;
  }

  translate(x, y) {
    this.x += round(x * 100) / 100;
    this.y += round(y * 100) / 100;
  }

}