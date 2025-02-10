import { GameBoard } from "./src/GameBoard.js";
import { Food } from "./src/Food.js";
import { Snake } from "./src/Snake.js";

const messageDiv = document.getElementById('message');
const resetGameBtn = document.getElementById('reset-game');
const currentScoreSpan = document.getElementById('current-score');
const highScoreSpan = document.getElementById('high-score');
const throughWallsInput = document.getElementById('through-walls');
const speedUpInput = document.getElementById('speed-up');

const height = 25;
const width = 25;
let speed = 200;
const acceleration = 1;
const foodEmojis = ['🚭'];

let direction, score, highScore, intervalId, throughWalls, speedUp;

const gameBoard = new GameBoard(width, height);
const snake = new Snake{gameBoard};
const food = new Food(foodEmojis);

initOptions();
initGame();

function initGame () {

    direction = 'up';
    speed = 200;
    
    highScore = localStorage.getItem('snakeHighScore') ?? 0;
    highScoreSpan.innerText = highScore;
    
    score = 0;
    currentScoreSpan.innerText = score;

    food.generate(gameBoard, snake);

    messageDiv.innerText = '';
    resetGameBtn.classList.add('hidden');

    intervalId = setInterval(run, speed);
}

function initOptions () {

    throughWalls = Number(localStorage.getItem('snakeThroughWalls') ?? 0);
    throughWallsInput.checked = !!throughWalls;
    
    speedUp = Number(localStorage.getItem('snakeSpeedUp') ?? 0);
    speedUpInput.checked = !!speedUp;
    
    throughWallsInput.addEventListener('change', () => {
        throughWalls = !throughWalls ? 1 : 0;
        localStorage.setItem('snakeThroughWalls', throughWalls);
    });
    
    speedUpInput.addEventListener('change', () => {
        speedUp = !speedUp ? 1 : 0;
        localStorage.setItem('snakeSpeedUp', speedUp);
    });
    
}

function run () {
    clearInterval(intervalId);
    snake.update(gameBoard, food, direction, throughWalls, stopGame);
    gameBoard.draw(snake, food);

    if ( isGameOver() ) {
        stopGame();
    } else {
        intervalId = setInterval(run, speed);
    }
}

document.addEventListener('keydown', e => {
    switch ( e.key.toLowerCase() ) {
        case 'arrowup':
        case 'w':
            direction = 'up';
            break;
        case 'arrowdown':
        case 's':
            direction = 'down';
            break;
        case 'arrowleft':
        case 'a':
            direction = 'left';
            break;
        case 'arrowright':
        case 'd':
            direction = 'right';
            break;
    }
});

resetGameBtn.addEventListener('click', () => initGame());

function isGameOver () {

    if ( snake.slice(1).includes(snake[0]) ) {
        return true;
    }

    return false;

}

function stopGame () {

    clearInterval(intervalId);
    messageDiv.innerText = 'Mäng läbi!';
    resetGameBtn.classList.remove('hidden');

    if ( score > highScore ) {
        localStorage.setItem('snakeHighScore', score);
    }

}
