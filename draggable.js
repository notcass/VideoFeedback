class Draggable {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.preX;
    this.preY;
    this.mX = null;
    this.mY = null;
  }

  show() {
    stroke(0);
    // fill(0, 100, 255);
    fill(100, 10, 175);
    rect(this.x, this.y, this.w, this.h);
  }

  listener() {
    if (mouseIsPressed && this.mX != null && this.mY != null) {
      let xDiff = mouseX - this.mX;
      let yDiff = mouseY - this.mY;
      this.x = this.preX + xDiff;
      this.y = this.preY + yDiff;
    }
  }

  checkMouse() {
    let x = mouseX - width / 2;
    let y = mouseY - height / 2;
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h
    );
  }
}

function mousePressed() {
  things.forEach((t) => {
    if (t.checkMouse()) {
      console.log('here');

      t.mX = mouseX;
      t.mY = mouseY;
      t.preX = t.x;
      t.preY = t.y;
    }
  });
}

function mouseReleased() {
  things.forEach((t) => {
    t.mX = null;
    t.mY = null;
  });
}
