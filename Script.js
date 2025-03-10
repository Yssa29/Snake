const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

let box = 20;

let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]; // Initial snake
let food = { x: 15, y: 10 }; // Initial food
let score = 0;
let d;
let game;
let gameSpeed = 100; // Vitesse par défaut

document.addEventListener("keydown", direction);

// Fonction pour changer la direction du serpent
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

// Fonction pour dessiner le serpent et la nourriture
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

// Fonction pour dessiner le serpent
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x * box, snake[i].y * box, box, box);
    }
}

// Fonction pour dessiner la nourriture
function drawFood() {
    context.fillStyle = "orange";
    context.fillRect(food.x * box, food.y * box, box, box);
}

// Fonction pour générer une nouvelle position de la nourriture
function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)),
        y: Math.floor(Math.random() * (canvas.height / box)),
    };
}

// Fonction pour vérifier les collisions
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Fonction de fin de jeu
function gameOver() {
    context.fillStyle = "red";
    context.font = "30px Arial";
    context.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
    context.fillText("Score: " + score, canvas.width / 2 - 70, canvas.height / 2 + 40);
    document.getElementById("gameOverOverlay").style.display = "block";
    document.getElementById("finalScore").innerText = score;
    document.getElementById("mainMenuButton").style.display = "inline-block"; // Afficher le bouton Menu Principal
    document.getElementById("restartButton").style.display = "inline-block"; // Afficher le bouton Restart
}

// Fonction pour démarrer le jeu
function startGame() {
    // Réinitialiser les variables du jeu
    snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    food = getRandomFoodPosition();
    score = 0;
    d = "RIGHT"; // Direction initiale
    game = setInterval(draw, gameSpeed);

    // Cacher la fenêtre de fin de jeu et le bouton menu principal
    document.getElementById("gameOverOverlay").style.display = "none";
    document.getElementById("mainMenuButton").style.display = "none"; // Cacher le bouton Menu Principal
    document.getElementById("restartButton").style.display = "none"; // Cacher le bouton Restart

    // Afficher le canvas de jeu
    document.getElementById("gameCanvas").style.display = "block"; // Rendre visible le canvas
}

// Fonction pour afficher la fenêtre modale de sélection de difficulté
function showDifficultyModal() {
    document.getElementById("difficulty-modal").style.display = "flex"; // Afficher la fenêtre modale de sélection de difficulté
    document.getElementById("gameCanvas").style.display = "none"; // Masquer le canvas tant que la difficulté n'est pas choisie
}

// Fonction pour sélectionner la difficulté et commencer le jeu
function setDifficulty(difficulty) {
    switch (difficulty) {
        case 'facile':
            gameSpeed = 150; // Vitesse facile
            break;
        case 'moyen':
            gameSpeed = 100; // Vitesse moyenne
            break;
        case 'difficile':
            gameSpeed = 50; // Vitesse difficile
            break;
    }

    // Masquer la fenêtre modale
    document.getElementById("difficulty-modal").style.display = "none";

    // Démarrer le jeu
    startGame();
}

// Fonction pour revenir au menu principal
document.getElementById("mainMenuButton").addEventListener("click", function() {
    location.reload(); // Recharger la page pour revenir au menu principal
});

// Fonction pour redémarrer la partie
document.getElementById("restartButton").addEventListener("click", function() {
    startGame(); // Relancer le jeu
});

// Afficher la modale au début du jeu
window.onload = function() {
    showDifficultyModal();
};
