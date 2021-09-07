/// <reference path="libraries/p5.global-mode.d.ts" />
/**
 *  ========= Closed loop video feedback =========
 *
 *
 *                 --REAL WORLD VARIABLES--
 *  Size & position of capture:
 *    are we capturing the whole image or just a part of it
 *
 *  Size & position of projection
 *    are we projecting this inside the bounds of the canvas, or outside
 *
 *  Latency
 *    Faked latency might help produce more trippy illusions
 *
 *  QUALITY
 *    Need to see if we can reduce the quality of the projects
 *
 *
 *
 *
 * TODO:
 *
 *    Add fluctuation of zoom
 */
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
const borderSize = 15;
const latency = 5;
const things = [];

function setup() {
  createCanvas(400, 400).parent('sketch-holder');

  background(0);
  stroke(255);
  xoff = createSlider(-30, 30, 0, 1);
  yoff = createSlider(-30, 30, 0, 1);
  rot = createSlider(-PI / 4, PI / 4, 0, 0.01);

  //============= Object setups ============
  setupStandard();
  // setupCross();
}

function draw() {
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
  if (keyIsDown) {
  }

  //=============== Displaying the image inside the canvas ==============
  // let img = get(xoff.value(), yoff.value(), width, height);
  // prevImages.push(img);

  // if (frameCount > latency) {
  //   image(
  //     prevImages[counter - latency],
  //     -width / 2 + borderSize,
  //     -height / 2 + borderSize,
  //     width - borderSize * 2,
  //     height - borderSize * 2
  //   );
  // }
  //=============== Displaying the image outside the canvas ======================
  // let img = get(xoff.value(), yoff.value(), width, height);
  // prevImages.push(img);

  // let margin = 200;

  // if (frameCount > latency) {
  //   image(
  //     prevImages[counter - latency],
  //     -width + 150,
  //     -height + 150,
  //     width * 2 - 300,
  //     height * 2 - 300
  //   );
  // }
  //=============== Displaying Outside -- VERY GOOD SETTINGS, NO IDEA WHAT I DID. THE SHAPES START TO DISTORT ======================
  let img = get(xoff.value(), yoff.value(), width, height);
  prevImages.push(img);

  let margin = 200;

  if (frameCount > latency) {
    image(
      prevImages[counter - latency],
      -width + margin,
      -height + margin,
      width * 2 - margin * 2,
      height * 2 - margin * 2
    );
  }

  //=============== Drawing with Mouse ==================
  if (mouseIsPressed && mouseX < width && mouseY < height) {
    strokeWeight(1);
    stroke(255);
    // stroke(0);
    // stroke(0, random(255), random(255));
    // fill(0);
    // fill(255);
    fill(0, random(255), random(255));

    circle(mouseX - width / 2, mouseY - height / 2, 23);
    // line(preX, preY, mouseX, mouseY);
    // line(mouseX, mouseY, random(width), random(height));
  }
  preX = mouseX;
  preY = mouseY;

  //=============== Latency Simulating ======================
  counter++;
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

  if (key === 'ArrowRight') things[0].x += 5;
  if (key === 'ArrowLeft') things[0].x -= 5;
  if (key === 'ArrowDown') things[0].y += 5;
  if (key === 'ArrowUp') things[0].y -= 5;
}

//======================= Draggable setups =========================

function setupStandard() {
  // things.push(new Draggable(-60, -100, 25, 80, 'rect', 255, 255, 255));
  // things.push(new Draggable(50, -100, 90, 15, 'rect', 150, 10, 200));
  // things.push(new Draggable(90, 150, 25, 0, 'circle', 150, 10, 200));

  things.push(new Draggable(-width / 2, -100, 25, 80, 'rect', 255, 255, 255));
}

function setupCross() {
  things.push(new Draggable(-width / 2, -25, width, 50, 'rect'));
  things.push(new Draggable(-25, -height / 2, 50, height, 'rect'));
}
