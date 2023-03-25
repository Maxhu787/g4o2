const socket = io();
const player = document.getElementById("player");
const mapWidth = 2000;
const mapHeight = 2000;
const playerWidth = 30;
const playerHeight = 30;

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
function updatePlayerPosition() {
    var x = currentPosition.x;
    var y = currentPosition.y;
    var movementRate = 8;
    if (keysPressed["ArrowUp"] || keysPressed["w"]) {
        y -= movementRate;
    }
    if (keysPressed["ArrowDown"] || keysPressed["s"]) {
        y += movementRate;
    }
    if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
        x -= movementRate;
    }
    if (keysPressed["ArrowRight"] || keysPressed["d"]) {
        x += movementRate;
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
});

document.addEventListener("keyup", function (event) {
    keysPressed[event.key] = false;
});
