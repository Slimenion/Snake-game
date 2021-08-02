const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/backGround.png";

const foodImg = new Image();
foodImg.src = "img/apple.png";

const box = 32;

var score = 0;

var maxScore;
if (localStorage.getItem("maxScore") == null) {
    localStorage.setItem("maxScore", 0);
} else {
    maxScore = localStorage.getItem("maxScore");
}

var food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

var snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener("keydown", directionKeyboard);

document.getElementById("upArrow").addEventListener("click", directionUp);
document.getElementById("leftArrow").addEventListener("click", directionLeft);
document.getElementById("downArrow").addEventListener("click", directionDown);
document.getElementById("rightArrow").addEventListener("click", directionRight);

var dir;

function eatTail(head, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            alert(
                `Вы проиграли съев часть себя
            Вы набрали: ` +
                    score +
                    `
            Чтобы попробовать снова обновите страницу`
            );
        }
    }
}

function directionUp() {
    dir = "up";
}
function directionLeft() {
    dir = "left";
}
function directionDown() {
    dir = "down";
}
function directionRight() {
    dir = "right";
}

function directionKeyboard(event) {
    if (event.keyCode == 37 && dir != "right") {
        dir = "left";
    }
    if (event.keyCode == 38 && dir != "down") {
        dir = "up";
    }
    if (event.keyCode == 39 && dir != "left") {
        dir = "right";
    }
    if (event.keyCode == 40 && dir != "up") {
        dir = "down";
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "blue" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    if (localStorage.getItem("maxScore") == null) {
        localStorage.setItem("maxScore", 0);
    }
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("Max score: " + maxScore, box * 9, box * 1.7);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    } else {
        snake.pop();
    }

    if (
        snakeX < box ||
        snakeX > box * 17 ||
        snakeY < 3 * box ||
        snakeY > box * 17
    ) {
        clearInterval(game);
        alert(
            `Вы проиграли вовремя не увернувшись от стены
        Вы набрали: ` +
                score +
                `
        Чтобы попробовать снова обновите страницу`
        );
    }

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    var newPosHead = {
        x: snakeX,
        y: snakeY,
    };

    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem("maxScore", score);
    }

    eatTail(newPosHead, snake);

    snake.unshift(newPosHead);
}

var game = setInterval(drawGame, 100);
