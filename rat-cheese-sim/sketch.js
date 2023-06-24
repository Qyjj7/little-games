class Mouse {
  constructor() {
    this.pos = createVector(width/2, height/2);
    this.destination = createVector(width/2, height/2);
    this.vel = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.topSpeed = 5;
    this.accelerationConstant= 0.7;
    this.headRadius = 20;
    this.bodyRadius = 30;

  }

  display() {
    noFill();
    circle(this.pos.x, this.pos.y, this.bodyRadius*2); //mouse body
    circle(this.destination.x, this.destination.y, 10); //destination
  }

  update() {

    this.vel.add(this.acceleration);

    this.pos.add(this.vel);
  }

  seek() {

    let desiredVel = createVector(this.destination.x - this.pos.x, this.destination.y - this.pos.y);
    desiredVel.setMag(this.topSpeed);
    this.acceleration.set(desiredVel.x - this.vel.x, desiredVel.y - this.vel.y);
    this.acceleration.normalize();
    this.acceleration.mult(this.accelerationConstant);
  }


}

let theMouse;

function setup() {
  createCanvas(windowWidth, windowHeight);

  theMouse = new Mouse();
}

function draw() {
  background(220);

  theMouse.seek();
  theMouse.update();
  theMouse.display();
}

function mousePressed() {
  theMouse.destination.set(mouseX, mouseY);
  theMouse.seek();
}