class GameBoard {

    gameBoardDiv = document.getElementById('game-board');
    width;
    height;

    constructor ( width, height ) {

        this.width = width;
        this.height = height;

        this.gameBoardDiv.style.gridTemplateColumns = `repeat(${this.width}, 12px)`;
        this.gameBoardDiv.style.gridTemplateRows = `repeat(${this.height}, 12px)`;
    }

    draw ( snake, food, foodY, foodX, foodIndex ) {

        this.gameBoardDiv.innerHTML = '';
        
        for ( let y = 0; y < this.width; y++ ) {
        
            for ( let x = 0; x < this.height; x++ ) {
        
                const cellDiv = document.createElement('div');
        
                if ( snake.coordinates.includes(`${y}_${x}`) ) {
                    cellDiv.innerText = '🚬';
                }
    
                if ( y == food.y && x == food.x ) {
                    cellDiv.innerText = food.emoji;
                }
                
                this.gameBoardDiv.appendChild(cellDiv);
        
            }
        
        }
        
    }
}

export { GameBoard }