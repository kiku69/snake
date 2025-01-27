const gameBoard = document.getElementById('game-board');

const height = 40;
const width = 40;
const speed = 200;

gameBoardDiv.style.gridTemplateColumns = `repeat(${width}, 8px)`;
gameBoardDiv.style.gridTemplateRows = `repeat(${width}, 8px)`;

let snake = [Math.floor(width / 2), Math.floor(height / 2)];
let direction = 'up'

const intervalId = setInterval(run, speed);

function run () {
    updateSnake();
    drawGameBoard();
}

document.addEventListener('keydown', e => {
    switch ( e.key.toLowerCase ) {
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

function drawGameBoard () {

    gameBoardDiv.innerHTML = '';

    for (let y = 0; y < width; y++) {

        for (let x = 0; x < height; x++) {
        
            const cellDiv = document.createElement('div');

            if ( snake.includes(`${y}_${x}`) ) {
            cellDiv.style.backgroundcolor = 'red';
            }

            gameBoardDiv.appendChild(cellDiv);
        
        }

    }

}

function updateSnake () {

    let [y, x] = snake[0].split('_');

    switch (direction) {
        case 'up':
            if ( y == 0 ) {
                y = height - 1;
            } else {
                y--;
            }
            break;
        case 'down':
            if ( y == height -1 ) {
                y = 0;
            } else {
            y++;
            }
            break;
        case 'left':
            if ( y == 0 ) {
                y = height - 1;
            } else {
            x--;
            }
            break;
        case 'right':
            if ( y == 0 ) {
                y = height - 1;
            } else {
            x++;
            }
            break;
    }

    snake.shift();
    snake.push(`${y}_${x}`);


}
