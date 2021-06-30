let video;
let dogImage;

function preload() {
    dogImage = loadImage("assets/cute-dog.png");
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    // create random speed
    x = random(width);
    y = random(height);
    xspeed = 2.5;
    yspeed = 2.5;

    //resize image
    dogImage.resize(width * .25, height * .25);

    video.hide();
}

function draw() {
    // draw webcam video
    image(video, 0, 0, width, height);

    // draw dog image
    image(dogImage, x, y);
    x = x + xspeed;
    y = y + yspeed;
    move();
}