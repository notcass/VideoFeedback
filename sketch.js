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
 */
let xoff, yoff, rot, zoom, colorPicker;
let xoffVal, yoffVal, rotVal, zoomVal, thingVal;
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
const latency = 0;
const things = [];

function setup() {
  // frameRate(6);
  createCanvas(800, 800).parent('sketch-holder');

  background(0);
  // background(255);
  stroke(255);
  setupDom();
  //============= Object setups ============
  // setupStandard();
  // setupCross();
  circle(width / 2, height / 2, 15);
}

function draw() {
  //=============== Rotation/Translation ==============
  translate(width / 2, height / 2);
  rotate(rot.value);

  //=============== Static & Draggable Inputs ==============
  if (staticFlag) {
    things.forEach((t) => {
      t.show();
      t.listener();
    });
  }
  // Irregular polygon
  // beginShape();
  // endShape();

  //=============== Displaying the image inside the canvas ==============
  // let img = get(xoff.value, yoff.value, width, height);
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
  // let img = get(xoff.value, yoff.value, width, height);
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
  let img = get(xoff.value, yoff.value, width, height);
  prevImages.push(img);

  // let margin = 200;
  // if (frameCount > latency) {
  //   image(
  //     prevImages[counter - latency],
  //     -width + margin,
  //     -height + margin,
  //     width * 2 - margin * 2,
  //     height * 2 - margin * 2
  //   );
  // }

  if (frameCount > latency) {
    // Variable ZOOMING
    let zoomVal = parseInt(zoom.value);
    image(
      prevImages[counter - latency],
      -width / 2 - zoomVal,
      -height / 2 - zoomVal,
      width + zoomVal * 2,
      height + zoomVal * 2
    );
  }

  //=============== Drawing with Mouse ==================
  if (mouseIsPressed && mouseX < width && mouseY < height) {
    strokeWeight(3);
    noStroke();
    // stroke(255);
    // stroke(0);
    // stroke(0, random(255), random(255));
    // fill(0);
    // fill(255);
    // fill(0, random(255), random(255));
    fill(random(255), random(255), random(255));
    // fill(0, 100, 255);

    circle(mouseX - width / 2, mouseY - height / 2, 23);
    // line( preX - width / 2, preY - width / 2, mouseX - width / 2, mouseY - width / 2);
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
  // if (fluctuateFlag) {
  //   let xSliderVal = round(sin(angle1));
  //   let ySliderVal = round(cos(angle1));
  //   xoff.value = xSliderVal;
  //   yoff.value = ySliderVal;
  //   angle1 += 0.02;
  // }

  //=============== Fluctuate Sliders with noise ===============
  if (fluctuateFlag) {
    // let xn = noise(angle1);
    // let xSliderVal = map(xn, 0, 1, -10, 10);
    // xoff.value = xSliderVal;

    // let yn = noise(angle1 + inc1 * 50);
    // let ySliderVal = map(yn, 0, 1, -10, 10);
    // yoff.value = ySliderVal;

    let rn = noise(angle1);
    // let rSliderVal = map(rn, 0, 1, -PI / 4, PI / 4);
    let rSliderVal = map(rn, 0, 1, -0.05, 0.05);
    rot.value = rSliderVal;

    angle1 += inc1;
    angle2 += inc2;
  }

  //================ Extra Stuff ====================
  updateDom();
  // if (keyIsPressed) {
  //   if (key === 'ArrowRight') rot.value = parseFloat(rot.value) + 0.01;
  //   if (key === 'ArrowLeft') rot.value = parseFloat(rot.value) - 0.01;
  //   if (key === 'ArrowDown') zoom.value = parseInt(zoom.value) - 1;
  //   if (key === 'ArrowUp') zoom.value = parseInt(zoom.value) + 1;
  // }
}

//======================= Draggable setups =========================

function setupStandard() {
  things.push(new Draggable(-260, -150, 145, 80, 'circle', 255, 255, 255));
  things.push(new Draggable(250, -200, 90, 15, 'circle', 150, 10, 200));
  things.push(new Draggable(90, 150, 25, 0, 'circle', 150, 10, 200));

  // things.push(new Draggable(0, 0, 0, 0, 'irregular', 150, 10, 200));

  // things.push(new Draggable(-width / 2, -100, 25, 80, 'rect', 255, 255, 255));
}

function setupCross() {
  things.push(new Draggable(-width / 2, -25, width, 50, 'rect'));
  things.push(new Draggable(-25, -height / 2, 50, height, 'rect'));
}

//======================= Utility Stuff =========================
function setupDom() {
  xoff = document.getElementById('xoff');
  yoff = document.getElementById('yoff');
  rot = document.getElementById('rot');
  zoom = document.getElementById('zoom');
  xoffVal = document.getElementById('xoffVal');
  yoffVal = document.getElementById('yoffVal');
  rotVal = document.getElementById('rotVal');
  zoomVal = document.getElementById('zoomVal');
  xoff.value = 0;
  yoff.value = 0;
  rot.value = 0;
  zoom.value = 0;
}

function updateDom() {
  xoffVal.innerText = xoff.value;
  yoffVal.innerText = yoff.value;
  rotVal.innerText = rot.value;
  zoomVal.innerText = `ZoomVal: ${zoom.value}`;
}

function keyPressed() {
  if (key === 'q') isLooping() ? noLoop() : loop();
  if (key === 'r') redraw();
  if (key === '1') {
    console.log(mouseX, mouseY);
  }
  if (key === 's') staticFlag = !staticFlag;
  if (key === 'f') fluctuateFlag = !fluctuateFlag;
  if (key === 'ArrowRight') rot.value = parseFloat(rot.value) + 0.01;
  if (key === 'ArrowLeft') rot.value = parseFloat(rot.value) - 0.01;
  if (key === 'ArrowDown') zoom.value = parseInt(zoom.value) - 1;
  if (key === 'ArrowUp') zoom.value = parseFloat(zoom.value) + 1;
}
