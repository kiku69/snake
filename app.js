
const gameBoardDiv = document.getElementById('game-board');
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
const food = ['🚭'];

gameBoardDiv.style.gridTemplateColumns = `repeat(${width}, 12px)`;
gameBoardDiv.style.gridTemplateRows = `repeat(${height}, 12px)`;

let snake, direction, foodY, foodX, foodIndex, score, highScore, intervalId, throughWalls, speedUp;

initOptions();
initGame();

function initGame () {

    snake = [Math.floor(height / 2) + '_' + Math.floor(width / 2)];
    direction = 'up';
    speed = 200;
    
    highScore = localStorage.getItem('snakeHighScore') ?? 0;
    highScoreSpan.innerText = highScore;
    
    score = 0;
    currentScoreSpan.innerText = score;

    generateFood();

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
    updateSnake();
    drawGameBoard();

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

function drawGameBoard () {

    gameBoardDiv.innerHTML = '';
    
    for ( let y = 0; y < width; y++ ) {
    
        for ( let x = 0; x < height; x++ ) {
    
            const cellDiv = document.createElement('div');
    
            if ( snake.includes(`${y}_${x}`) ) {
                cellDiv.innerText = '🚬';
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
                if ( throughWalls ) {
                    y = height - 1;
                } else {
                    stopGame();
                }
            } else {
                y--;
            }
            break;
        case 'down':
            if ( y == height - 1 ) {
                if ( throughWalls ) {
                    y = 0;
                } else {
                    stopGame();
                }
            } else {
                y++;
            }
            break;
        case 'left':
            if ( x == 0 ) {
                if ( throughWalls ) {
                    x = width - 1;
                } else {
                    stopGame();
                }
            } else {
                x--;
            }
            break;
        case 'right':
            if ( x == width - 1 ) {
                if ( throughWalls ) {
                    x = 0;
                } else {
                    stopGame();
                }
            } else {
                x++;
            }
            break;
    }

    snake.unshift(`${y}_${x}`);
    
    if ( y == foodY && x == foodX ) {

        score++;
        currentScoreSpan.innerText = score;

        if ( score % acceleration == 0 ) {
            speed -= 5;
        }

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
    messageDiv.innerText = 'Mäng läbi!';
    resetGameBtn.classList.remove('hidden');

    if ( score > highScore ) {
        localStorage.setItem('snakeHighScore', score);
    }

}
