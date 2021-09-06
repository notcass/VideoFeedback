/// <reference path="libraries/p5.global-mode.d.ts" />
let xoff, yoff, rot;
let prevImages = [];
let counter = 0;
let prex, prey;
let angle1 = 0;
let angle2 = 0;
let inc1 = 0.01;
let inc2 = 0.001;
let staticFlag = true;
let fluctuateFlag = false;
const borderSize = 5;
const latency = 1;
const things = [];
/**
 * TODO: Add a class for a random shape at a random spot
 *       Instead of drawing manually in the Static Inputs section
 */

function preload() {}
function setup() {
  createCanvas(400, 400).parent('sketch-holder');

  // background(0);
  background(18);
  stroke(255);
  xoff = createSlider(-30, 30, 0, 1);
  yoff = createSlider(-30, 30, 0, 1);
  rot = createSlider(-PI / 4, PI / 4, 0, 0.01);
  things.push(new Draggable(-120, -100, 20, 90));
}

function draw() {
  //=============== Drawing with Mouse ==================
  // if (mouseIsPressed && mouseX < width && mouseY < height) {
  //   stroke(255);
  //   stroke(0, random(255), random(255));
  //   strokeWeight(10);
  //   line(preX, preY, mouseX, mouseY);
  //   // line(mouseX, mouseY, random(width), random(height));
  // }
  // preX = mouseX;
  // preY = mouseY;

  //=============== Rotation/Translation ==============
  translate(width / 2, height / 2);
  rotate(rot.value());

  //=============== Static & Draggable Inputs ==============
  if (staticFlag) {
    // rect(-120, -10, 90, 20);
    things.forEach((t) => {
      t.show();
      t.listener();
    });
  }

  //=============== Displaying the image inside the canvas ==============
  // let img = get(
  //   xoff.value() - width / 2,
  //   yoff.value() - height / 2,
  //   xoff.value() + width / 2,
  //   yoff.value() + height / 2
  // );

  // This is the get() that works with translate
  let img = get(xoff.value(), yoff.value(), width, height);
  prevImages.push(img);

  if (frameCount > latency) {
    image(
      prevImages[counter - latency],
      -width / 2 + borderSize,
      -height / 2 + borderSize,
      width - borderSize * 2,
      height - borderSize * 2
    );
  }

  counter++;

  // If array length > 100, make new array
  if (counter > 100) {
    prevImages = prevImages.slice(prevImages.length - latency);

    counter = latency;
  }

  //=============== Fluctuate Sliders with sin/cos ===============
  // let xSliderVal = sin(angle1) * 10;
  // let ySliderVal = cos(angle1) * 10;
  // xoff.value(xSliderVal);
  // yoff.value(ySliderVal);
  // angle1 += 0.02;

  //=============== Fluctuate Sliders with noise ===============
  if (fluctuateFlag) {
    let xn = noise(angle1);
    let xSliderVal = map(xn, 0, 1, -10, 10);
    xoff.value(xSliderVal);

    let yn = noise(angle1 + inc1 * 50);
    let ySliderVal = map(yn, 0, 1, -10, 10);
    yoff.value(ySliderVal);

    // let rn = noise(angle2);
    // let rSliderVal = map(rn, 0, 1, -PI / 4, PI / 4);
    // rot.value(rSliderVal);

    angle1 += inc1;
    angle2 += inc2;
  }
}

function keyPressed() {
  if (key === 'q') isLooping() ? noLoop() : loop();
  if (key === '1') {
    console.log(mouseX, mouseY);
  }
  if (key === 's') staticFlag = !staticFlag;
  if (key === 'f') fluctuateFlag = !fluctuateFlag;
}
