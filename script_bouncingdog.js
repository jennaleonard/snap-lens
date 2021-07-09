p5.disableFriendlyErrors = true; // disables FES

let video;

let dogImage;
let kidsCheer;

let poseNet;
let poses = [];
let keypoints = [];
let interpolatedKeypoints = [];

function preload() {
    dogImage = loadImage("assets/cute-dog.png");
    kidsCheer = loadSound("sounds/yay.mp3");
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    poseNet = ml5.poseNet(video, { flipHorizontal: true });
    poseNet.on("pose", function (results) {
    poses = results;
    });

    x = Math.random(width);
    y = Math.random(height);
    xspeed = 2.5;
    yspeed = 2.5;

    dogImage.resize(width * .25, height * .25);

    video.hide();

    createInitialKeypoints();

    kidsCheer.setVolume(0.5);
}

function updateKeypoints() {
    if (poses.length <= 0) {
      return;
    }

    let pose = poses[0].pose;
    keypoints = pose.keypoints;
  
    for (let kp = 0; kp < keypoints.length; kp++) {
      let oldKeypoint = interpolatedKeypoints[kp];
      let newKeypoint = keypoints[kp].position;
  
      let interpX = lerp(oldKeypoint.x, newKeypoint.x, 0.3);
      let interpY = lerp(oldKeypoint.y, newKeypoint.y, 0.3);
  
      let interpolatedKeypoint = { x: interpX, y: interpY };
  
      interpolatedKeypoints[kp] = interpolatedKeypoint;
    }
  }

function draw() {
    let flippedVideo = ml5.flipImage(video);
    image(flippedVideo, 0, 0, width, height);

    image(dogImage, x, y);
    x = x + xspeed;
    y = y + yspeed;
    move();

    updateKeypoints();
    petDog();
}

function createInitialKeypoints() {
    let numKeypoints = 17;
    for (let i = 0; i < numKeypoints; i++) {
      newKeypoint = { x: width / 2, y: height / 2 };
  
      interpolatedKeypoints.push(newKeypoint);
    }
  }

function petDog() {
    let leftWristPosition = interpolatedKeypoints[9];
    let rightWristPosition = interpolatedKeypoints[10];
    
    let dleft = dist(
        x + dogImage.width / 2, 
        y + dogImage.height / 2, 
        leftWristPosition.x, 
        leftWristPosition.y
        );
    let dright = dist(
        x + dogImage.width / 2, 
        y + dogImage.height / 2, 
        rightWristPosition.x, 
        rightWristPosition.y
        );

    if (dleft <= 50) {
        if (kidsCheer.isPlaying() === false) {
          kidsCheer.play();
        };
        console.log('Left hand pet the dog!')
    }
    if (dright <= 50) {
      if (kidsCheer.isPlaying() === false) {
        kidsCheer.play();
      };
        console.log('Right hand pet the dog!')
    }
}