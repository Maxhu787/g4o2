const socket = io();
const mapWidth = window.innerWidth;
const mapHeight = window.innerHeight;
const playerWidth = 30;
const playerHeight = 30;

const container = document.getElementById("container");
const map = document.getElementById("map");

let username = '';
do {
    username = prompt('Username');
} while (username.match(/[^a-zA-Z0-9_]+/g) || username == "");

socket.emit('user-connect', username);
socket.on('user-connect', function (username) {
    console.log(`${username} connected`);

    const newPlayer = document.createElement("div");
    newPlayer.classList.add("player");
    newPlayer.setAttribute("id", username);
    map.appendChild(newPlayer);

    const newPlayerHealth = document.createElement("div");
    newPlayerHealth.classList.add("health");
    newPlayerHealth.setAttribute("id", `${username}-health`);
    newPlayer.appendChild(newPlayerHealth);
});

const newPlayer = document.createElement("div");
newPlayer.classList.add("player");
newPlayer.setAttribute("id", username);
map.appendChild(newPlayer);

const newPlayerHealth = document.createElement("div");
newPlayerHealth.classList.add("health");
newPlayerHealth.setAttribute("id", `${username}-health`);
newPlayer.appendChild(newPlayerHealth);

const player = document.getElementById(username);
const keysPressed = {};

let currentPosition = {
    x: 500,
    y: 500
};

document.addEventListener("keydown", function (event) {
    keysPressed[event.key] = true;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d"].includes(event.key)) {
        event.preventDefault();
    }
});

function updatePlayerPosition() {
    let x = currentPosition.x;
    let y = currentPosition.y;
    const playerMovementRate = 8;

    if (keysPressed["ArrowUp"] || keysPressed["w"]) {
        y -= playerMovementRate;
        window.scrollBy(0, -playerMovementRate);
    }
    if (keysPressed["ArrowDown"] || keysPressed["s"]) {
        y += playerMovementRate;
        window.scrollBy(0, playerMovementRate);
    }
    if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
        x -= playerMovementRate;
        window.scrollBy(-playerMovementRate, 0);
    }
    if (keysPressed["ArrowRight"] || keysPressed["d"]) {
        x += playerMovementRate;
        window.scrollBy(playerMovementRate, 0);
    }

    player.style.transform = `translate(${x}px, ${y}px)`;
    const padding = 150;
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
