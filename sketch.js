/// <reference path="libraries/p5.global-mode.d.ts" />
let xoff, yoff, rot;
let prevImages = [];
const latency = 5;
let counter = 0;
let prex, prey;
let angle = 0;

function preload() {}
function setup() {
  createCanvas(400, 400).parent('sketch-holder');

  background(0);
  stroke(255);
  xoff = createSlider(-10, 10, 0, 1);
  yoff = createSlider(-10, 10, 0, 1);
  rot = createSlider(0, PI / 2, 0, 0.1);
  circle(100, 200, 25);
}

function draw() {
  if (mouseIsPressed && mouseX < width && mouseY < height) {
    // circle(mouseX, mouseY, 15);
    stroke(255);
    strokeWeight(3);
    line(preX, preY, mouseX, mouseY);
  }
  preX = mouseX;
  preY = mouseY;

  //=============== Static Inputs ==============
  stroke(0);
  rect(50, 100, 20, 200);

  //=============== Test get() with params ===============
  let img = get(
    xoff.value(),
    yoff.value(),
    xoff.value() + width + 20,
    xoff.value() + height + 20
  );
  // let img = get(xoff.value(), yoff.value(), width, height);
  prevImages.push(img);

  if (frameCount > latency) {
    // LEFT OFF HERE: Somehow the image is updating before this if statement

    image(prevImages[counter - latency], 5, 5, width - 10, height - 10);
  }
  counter++;

  /*
  if (counter > 100)
    make new array that starts with the last 5 items in previous images
  */
  if (counter > 100) {
    prevImages = prevImages.slice(prevImages.length - latency);

    counter = latency;
  }

  //=============== Fluctuate Sliders ===============
  let xSliderVal = sin(angle) * 10;
  let ySliderVal = cos(angle) * 10;
  // xoff.value(xSliderVal);
  // yoff.value(ySliderVal);
  // angle += 0.02;
}

function keyPressed() {
  if (key === 'q') isLooping() ? noLoop() : loop();
  if (key === '1') console.log(prevImages.length);
}
