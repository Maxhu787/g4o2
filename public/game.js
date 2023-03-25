const socket = io();
const player = document.getElementById("player");
const mapWidth = 2000;
const mapHeight = 2000;
const playerWidth = 30;
const playerHeight = 30;

const container = document.getElementById("container");
const map = document.getElementById("map");

let usernametemp = '';
/*do {
    usernametemp = prompt('Username');
} while (usernametemp.match(/[^a-zA-Z0-9_]+/g) || usernametemp == "")
*/
//    username = usernametemp;
username = 'g4o2';
socket.emit('user-connect', username);
socket.on('user-connect', function (username) {
    console.log(`${username} connected`);
})
var keysPressed = {};

var currentPosition = {
    x: 0,
    y: 0
};

document.addEventListener("keydown", function (event) {
    keysPressed[event.key] = true;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d"].includes(event.key)) {
        event.preventDefault();
    }
});

function updatePlayerPosition() {
    var x = currentPosition.x;
    var y = currentPosition.y;
    var playerMovementRate = 8;

    if (keysPressed["ArrowUp"] || keysPressed["w"]) {
        y -= playerMovementRate;
    }
    if (keysPressed["ArrowDown"] || keysPressed["s"]) {
        y += playerMovementRate;
    }
    if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
        x -= playerMovementRate;
    }
    if (keysPressed["ArrowRight"] || keysPressed["d"]) {
        x += playerMovementRate;
    }

    let screenMiddleX = window.innerWidth / 2;
    let screenMiddleY = window.innerHeight / 2;

    // check if player is at middle of screen horizontally
    if (x > screenMiddleX) {
        window.scrollBy(playerMovementRate, 0);
    } else if (x < screenMiddleX) {
        window.scrollBy(-playerMovementRate, 0);
    }

    // check if player is at middle of screen vertically
    if (y > screenMiddleY) {
        window.scrollBy(0, playerMovementRate);
    } else if (y < screenMiddleY) {
        window.scrollBy(0, -playerMovementRate);
    }


    player.style.transform = `translate(${x}px, ${y}px)`;
    let padding = 20;
    if (x < 0) {
        x = padding;
    }
    if (y < 0) {
        y = padding;
    }
    if (x + playerWidth > mapWidth) {
        x = mapWidth - (playerWidth + padding);
    }
    if (y + playerHeight > mapHeight) {
        y = mapHeight - (playerHeight + padding);
    }

    window.requestAnimationFrame(updatePlayerPosition);

    currentPosition.x = x;
    currentPosition.y = y;
}

updatePlayerPosition();

document.addEventListener("keydown", function (event) {
    keysPressed[event.key] = true;
    event.preventDefault();
});

document.addEventListener("keyup", function (event) {
    keysPressed[event.key] = false;
    event.preventDefault();
});
