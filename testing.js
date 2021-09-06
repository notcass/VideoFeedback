/// <reference path="libraries/p5.global-mode.d.ts" />
let xoff, yoff;
let prevImages1 = [];
let prevImages2 = [];
let testImg1;
let testImg2;

const latency = 30;
let counter = 0;

function preload() {
  testImg1 = loadImage('hi.png');
  testImg2 = loadImage('doge.png');
}
function setup() {
  createCanvas(400, 400).parent('sketch-holder');

  background(18);
  xoff = createSlider(-10, 10, 0, 1);
  yoff = createSlider(-10, 10, 0, 1);
  circle(200, 200, 20);
}

function draw() {
  // background(18, 15);

  noStroke();
  if (mouseIsPressed) {
    // fill(random(155), random(155), random(155));
    fill(255);
    circle(mouseX, mouseY, 10);
  }

  //=============== Static Objects ===============
  fill(0, 0, 220);
  stroke(255);
  // fill(random(255), random(255), random(255));
  // circle(200 + random(-2, 2), 200 + random(-2, 2), 12);
  // stroke(255);
  rect(20, 50, 20, 300, 15);

  //=============== Test get() with params ===============
  let img = get(xoff.value(), yoff.value(), width, height);

  image(img, 5, 5, width - 10, height - 10);

  //=============== Feedback Loop Single ===============
  // let img = get();
  // let img = get(xoff.value(), yoff.value(), width, height);

  // image(img, xoff, xoff, width + 3, height + 3);
  // image(img, -10, -10, width + 20, height + 20);

  //=============== Layered Feedbacks ===============
  // let img = get();

  // push();
  // translate(150, 0);
  // rotate(PI / 4);
  // // image(testImg1, 0, 0, 200, 200);
  // image(img, 0, 0, 200, 300);
  // pop();

  // tint(255, 150);
  // // image(testImg2, 170, 150, 190, 230);
  // image(img, 170, 150, 190, 230);

  // img = get();
  // image(img, -10, -10, width + 20, height + 20);

  //=============== Layered Feedbacks, get() args===============
  // let img = get(xoff.value(), yoff.value(), width, height);

  // push();
  // translate(150, 0);
  // rotate(PI / 4);
  // // image(testImg1, 0, 0, 200, 200);
  // image(img, 0, 0, 200, 300);
  // pop();

  // tint(255, 150);
  // // image(testImg2, 170, 150, 190, 230);
  // image(img, 170, 150, 190, 230);

  // img = get(xoff.value(), yoff.value(), width, height);
  // image(img, 0, 0, width, height);
  // // image(img, -10, -10, width + 20, height + 20);
}

function keyPressed() {
  if (key === 'q') isLooping() ? noLoop() : loop();
  if (key === '1') {
    // let img = createImage(50, 50);
    // img.loadpixels();
    // image(img, 200, 200, 50, 50);
  }
}
