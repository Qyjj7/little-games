class Rat {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.destination = createVector(x, y);
    this.direction = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.w = 50;
    this.h = 100;
    this.mouthRadius = 15;
    this.topSpeed = 5;
    this.acceleration = 1;
    this.atDestination = true;
  }

  display() {
    noFill();
    ratImage.width = this.w;
    ratImage.height = this.h * 1.5;
    rectMode(CENTER);
    circle(this.destination.x, this.destination.y, 10);

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() + PI/2);
    //triangle(-this.w, -this.w/2, -this.w, this.w/2, this.w, 0);
    rect(0, 0, this.w, this.h);
    circle(0, -this.h/2, this.mouthRadius*2);
    image(ratImage, 5, 20);
    pop();
  }

  update() {

    this.direction.set(this.destination.x - this.pos.x, this.destination.y - this.pos.y);
    this.direction.normalize();

    if (! this.atDestination) {
      this.vel.add(this.direction.mult(this.acceleration));
      this.vel.limit(this.topSpeed);
      this.pos.add(this.vel);
    }
  }

  destinationCheck() {
    if (dist(this.destination.x, this.destination.y, this.pos.x, this.pos.y) <= 10) {
      this.atDestination = true;
    }
  }
}

class Cheese {
  constructor() {
  }

  display() {

  }

}


let theRat;
let theCheese;
let ratImage;

function preload() {
  ratImage = loadImage("rat2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);
  theRat = new Rat(width/2, height/2);
  theCheese = new Cheese();

}

function draw() {
  background(220);

  theRat.update();
  theRat.destinationCheck();
  theRat.display();
}

function mousePressed() {
  theRat.destination.set(mouseX, mouseY);
  theRat.atDestination = false;
}