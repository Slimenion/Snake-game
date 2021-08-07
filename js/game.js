const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/backGround.png";

const foodImg = new Image();
foodImg.src = "img/apple.png";

const box = 32;

var score = 0;

var BobrGamesSnakeGameMaxScore;

if (localStorage.getItem("difficult") == null) {
    localStorage.setItem("difficult", 100);
}

if (localStorage.getItem("BobrGamesSnakeGameMaxScore") == null) {
    localStorage.setItem("BobrGamesSnakeGameMaxScore", 0);
} else {
    BobrGamesSnakeGameMaxScore = localStorage.getItem(
        "BobrGamesSnakeGameMaxScore"
    );
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

document.getElementById("info").addEventListener("click", info);
document.getElementById("difficult").addEventListener("click", changeDifficult);

var dir;

function changeDifficult() {
    var difficult = prompt(`Изначальный параметр 100.
    Чем больше цифра, тем медленнее игра
    Рекомендованнуемые значения от 100 до 300`);
    localStorage.setItem("difficult", difficult);
}

function info() {
    alert(`Игра змейка
    на компьютере можно использовать стрелочки
    на телефоне используйте кнопки
    Created by Bobrgames 2021
    Все права не защищены.`);
}

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
    if (dir != "down") dir = "up";
}
function directionLeft() {
    if (dir != "right") dir = "left";
}
function directionDown() {
    if (dir != "up") dir = "down";
}
function directionRight() {
    if (dir != "left") dir = "right";
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

    if (localStorage.getItem("BobrGamesSnakeGameMaxScore") == null) {
        localStorage.setItem("BobrGamesSnakeGameMaxScore", 0);
    }
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(
        "Max score: " + BobrGamesSnakeGameMaxScore,
        box * 9,
        box * 1.7
    );

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

    if (score > BobrGamesSnakeGameMaxScore) {
        BobrGamesSnakeGameMaxScore = score;
        localStorage.setItem("BobrGamesSnakeGameMaxScore", score);
    }

    eatTail(newPosHead, snake);

    snake.unshift(newPosHead);
}

var game = setInterval(drawGame, localStorage.getItem("difficult"));
