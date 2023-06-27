class Line {
  constructor() {
    this.domain = [-10, 10];
    this.range = [0, 0];
    this.m = 1;
    this.b = 0;
    this.points = [];
    this.precision = 1;
  }
  
  determinePoints() {
    this.points = [];
    for (let x = this.domain[0]; x <= this.domain[1]; x += this.precision) {
      let y = -(this.m * x + this.b);
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
    let previousPoint = this.points[0];
    for (let i = 1; i < this.points.length; i++) {
      line(previousPoint[0]*displaySize, previousPoint[1]*displaySize, this.points[i][0]*displaySize, this.points[i][1]*displaySize);
    }
  }
}

let displaySize = 100;
let theLine;

let m;
let b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);

  theLine = new Line();
  theLine.determinePoints();
  theLine.display();

  showGrid();

  m = createInput(str(theLine.m));
  m.position(45, 20);
  m.size(10);

  b = createInput(str(theLine.b));
  b.position(100, 20);
  b.size(10);
}

function draw() {
  background(220);

  push();
  translate(width/2, height/2);
  theLine.display();
  showGrid();
  pop();

  push();
  textAlign(LEFT);
  textSize(25);
  text("y =   x +   ", 10, 40);
  pop();
}

function showGrid() {
  line(0, -height, 0, height);
  line(-width, 0, width, 0);

  for (let x = theLine.domain[0]; x <= theLine.domain[1]; x ++) {
    line(x*displaySize, 5, x*displaySize, -5);
    text(x, x*displaySize + 5, -5);
  }

  for (let y = theLine.range[0]; y <= theLine.range[1]; y ++) {
    line(5, y*displaySize, -5, y*displaySize);
    text(-y, 5, y*displaySize -5);
  }
}

function keyReleased() {
  if (keyCode === ENTER) {
    theLine.m = float(m.value());
    theLine.b = float(b.value());
    theLine.determinePoints();
  }
}
  
