class Draggable {
  constructor(x, y, w, h, type, r, g, b) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.preX;
    this.preY;
    this.mX = null;
    this.mY = null;
    if (r != null) {
      this.c = color(r, g, b);
    }
  }

  show() {
    stroke(0);
    strokeWeight(1);
    // Map Colors
    let a = map(this.x, -width / 2, width / 2, 0, 255);
    let b = map(this.y, -height / 2, height / 2, 0, 255);
    let c = map(this.x, -width / 2, width / 2, 255, 0);
    if (this.c) {
      fill(c, a, b);
    } else {
      // noStroke();
      fill(255);
    }

    switch (this.type) {
      case 'rect':
        rect(this.x, this.y, this.w, this.h);
        break;
      case 'circle':
        circle(this.x, this.y, this.w);
        break;
    }
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
    switch (this.type) {
      case 'rect':
        return (
          x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h
        );
      case 'circle':
        let d = dist(x, y, this.x, this.y);
        return d < this.w / 2;
    }
  }
}

function mousePressed() {
  things.forEach((t) => {
    if (t.checkMouse()) {
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
