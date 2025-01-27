const gameBoard = document.getElementById('game-board');

const height = 40;
const width = 40;
const speed = 200;

gameBoardDiv.style.gridTemplateColumns = `repeat(${width}, 8px)`;
gameBoardDiv.style.gridTemplateRows = `repeat(${width}, 8px)`;

let snake = [Math.floor(width / 2), Math.floor(height / 2)];
let direction

const intervalId = setInterval(run, speed);

drawGameBoard();

function run () {
    updateSnake();
    drawGameBoard();
}

function drawGameBoard () {

    gameBoardId

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
            y--;
            break;
        case 'down':
            y++;
            break;
        case 'left':
            x--;
            break;
        case 'right':
            x++;
            break;
    }

    snake.shift();


}
