class Line {
  constructor() {
    this.domain = [-10, 10];
    this.range = [0, 0];
    this.terms = [];
    this.points = [];
    this.precision = 0.05;
  }
  
  determinePoints() {
    this.points = [];
    for (let x = this.domain[0]; x <= this.domain[1]; x += this.precision) {
      let y = 0;
      for (let someTerm of this.terms) {

        y += someTerm.coefficient * pow(x, someTerm.exponent);

      }

      y = -y;
      this.points.push([x, y]);
      if (y < this.range[0]) {
        this.range[0] = y;
      }
      if (y > this.range[1]) {
        this.range[1] = y;
      }

    }
  }
  
  display() {
    push();
    strokeWeight(2);
    let previousPoint = this.points[0];
    for (let i = 1; i < this.points.length; i++) {
      line(previousPoint[0]*displaySize, previousPoint[1]*displaySize, this.points[i][0]*displaySize, this.points[i][1]*displaySize);
      previousPoint = this.points[i];
    }
    pop();
  }
}

class Term {
  constructor(location) {
    this.coefficient = 1;
    this.exponent = 0;
    this.coefficientInput = createInput("1");
    this.exponentInput = createInput("0");
    this.coefficientInput.position(10 + location*60, 20);
    this.coefficientInput.size(10);
    this.exponentInput.position(30 + location*60, 20);
    this.exponentInput.size(10);
  }

  interpretString() {
    this.coefficient = float(this.coefficientInput.value());
    this.exponent = float(this.exponentInput.value());
  }
}

let displaySize = 100;
let theLine;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  frameRate(20);

  theLine = new Line();

  showGrid();
}

function draw() {
  background(220);

  push();
  translate(width/2, height/2);
  theLine.display();
  showGrid();
  pop();
}

function showGrid() {
  line(0, -height, 0, height);
  line(-width, 0, width, 0);

  for (let x = round(theLine.domain[0]); x <= theLine.domain[1]; x ++) {
    line(x*displaySize, 5, x*displaySize, -5);
    text(x, x*displaySize + 5, -5);
  }

  for (let y = round(theLine.range[0]); y <= theLine.range[1]; y ++) {
    line(5, y*displaySize, -5, y*displaySize);
    text(-y, 5, y*displaySize -5);
  }
}

function keyReleased() {
  if (keyCode === ENTER) {
    for (let someTerm of theLine.terms) {
      someTerm.interpretString();
    }
    theLine.determinePoints();
  }
  if (keyCode === UP_ARROW) {
    theLine.terms.push(new Term(theLine.terms.length));
  }
}