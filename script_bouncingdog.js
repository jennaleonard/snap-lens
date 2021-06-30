let video;
let dogImage;
let x, xspeed, y, yspeed;

function preload() {
    dogImage = loadImage("assets/cute-dog.png");
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    // create random speed
    // x = round(random(width));
    // y = round(random(height));
    xspeed = 2.5;
    yspeed = 2.5;

    video.hide();
}

function draw() {
    // draw webcam video
    image(video, 0, 0, width, height);

    // draw dog image
    image(dogImage, 0, 0);
    x = x + xspeed;
    y = y + yspeed;
    move();
}

function move() {
    if (x + dogImage.width == width) {
        xspeed = -xspeed;
        x = width - dogImage.width;
    } else if (x == 0) {
        xspeed = -xspeed;
        x = 0;
    } else if (y + dogImage.height == height) {
        yspeed = -yspeed;
        y = height - dogImage.height;
    } else if (y == 0) {
        yspeed = -yspeed;
        y = 0;
    }
}