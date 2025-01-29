const gameBoardDiv = document.getElementById('game-board');
const messageDiv = document.getElementById('message');
const resetGameBtn = document.getElementById('reset-game');
const currentScoreSpan = document.getElementById('current-score');
const highScoreSpan = document.getElementById('high-score');

const height = 10;
const width = 10;
const speed = 200;
const food = ['🍎', '🍉', '🍇', '🍔', '🧁', '🥪'];

gameBoardDiv.style.gridTemplateColumns = `repeat(${width}, 12px)`;
gameBoardDiv.style.gridTemplateRows = `repeat(${height}, 12px)`;

let snake = [Math.floor(height / 2) + '_' + Math.floor(width / 2)];
let direction = 'up';
let foodY, foodX, foodIndex;
let score = 0;

let highScore = localStorage.getItem('snakeHighScore') ?? 0;
highScoreSpan.innerText = highScore;

generateFood();

const intervalId = setInterval(run, speed);

function run () {
    updateSnake();
    drawGameBoard();
}

if ( isGameOver() ) {

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

function drawGameBoard () {

    gameBoardDiv.innerHTML = '';
    
    for ( let y = 0; y < width; y++ ) {
    
        for ( let x = 0; x < height; x++ ) {
    
            const cellDiv = document.createElement('div');
    
            if ( snake.includes(`${y}_${x}`) ) {
                cellDiv.innerText = '🪳';
            }

            if ( y == foodY && x == foodX ) {
                cellDiv.innerText = food[foodIndex];
            }
            
            gameBoardDiv.appendChild(cellDiv);
    
        }
    
    }
    
}

function updateSnake () {
    
    let [y, x] = snake[0].split('_');

    switch ( direction ) {
        case 'up':
            if ( y == 0 ) {
                y = height - 1;
            } else {
                y--;
            }
            break;
        case 'down':
            if ( y == height - 1 ) {
                y = 0;
            } else {
                y++;
            }
            break;
        case 'left':
            if ( x == 0 ) {
                x = width - 1;
            } else {
                x--;
            }
            break;
        case 'right':
            if ( x == width - 1 ) {
                x = 0;
            } else {
                x++;
            }
            break;
    }

    snake.unshift(`${y}_${x}`);
    
    if ( y == foodY && x == foodX ) {

        score++
        currentScoreSpan.innerText = score;

        generateFood();
    } else {
        snake.pop();
    }

}

function generateFood () {
    
    do {
        foodY = Math.floor(Math.random() * height);
        foodX = Math.floor(Math.random() * width);
    } while ( snake.includes(`${foodY}_${foodX}`) );
    
    foodIndex = Math.floor(Math.random() * food.length);

}

function isGameOver () {
    
    if ( snake.slice(1).includes(snake[0]) ) {
        return true;
    }

    return false;
}

function stopGame () {
    clearInterval(intervalId);
    messageDiv.innerText = 'Game over';
    resetGameBtn.classList.remove('hidden');

    if ( score > highScore ) {
        localStorage.setItem('snakeHighScore', score);
    }
}
