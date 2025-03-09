const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

let box = 20;

let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]; // Initial snake
let food = { x: 15, y: 10 }; // Initial food
let score = 0;
let d;
let game;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX--;
    if (d == "UP") snakeY--;
    if (d == "RIGHT") snakeX++;
    if (d == "DOWN") snakeY++;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 ||
        snakeX >= canvas.width / box ||
        snakeY < 0 ||
        snakeY >= canvas.height / box ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        gameOver();
        return;
    }

    snake.unshift(newHead);

    context.fillStyle = "red";
    context.font = "30px Arial";
    context.fillText("Score: " + score, 10, 30);
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x * box, snake[i].y * box, box, box);
    }
}

function drawFood() {
    context.fillStyle = "orange";
    context.fillRect(food.x * box, food.y * box, box, box);
}

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)),
        y: Math.floor(Math.random() * (canvas.height / box)),
    };
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    context.fillStyle = "red";
    context.font = "30px Arial";
    context.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
    context.fillText("Score: " + score, canvas.width / 2 - 70, canvas.height / 2 + 40);
    document.getElementById("gameOverOverlay").style.display = "block";
    document.getElementById("finalScore").innerText = score;
}

function startGame() {
    snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]; // Reset snake position
    food = getRandomFoodPosition(); // Reset food position
    score = 0;
    d = "RIGHT"; // Initial direction
    game = setInterval(draw, 100);
    document.getElementById("gameOverOverlay").style.display = "none";
}

document.getElementById("restartButton").addEventListener("click", startGame);

startGame(); // Start the game when the page loads
