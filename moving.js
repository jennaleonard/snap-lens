let x, xspeed, y, yspeed;

function move() {
    if (x + dogImage.width >= width) {
        xspeed = -xspeed;
        x = width - dogImage.width;
    } else if (x <= 0) {
        xspeed = -xspeed;
        x = 0;
    } else if (y + dogImage.height >= height) {
        yspeed = -yspeed;
        y = height - dogImage.height;
    } else if (y <= 0) {
        yspeed = -yspeed;
        y = 0;
    }
}