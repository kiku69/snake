class Snake {

    coordinates;

    constructor (gameBoard) {
        this.snake = [Math.floor(height / 2) + '_' + Math.floor(width / 2)];
    }

    update ( game, gameBoard, food, direction, throughWalls, stopGame, score, currentScoreSpan, acceleration, speed ) {
        
        let [y, x] = this.coordinates[0].split('_');

        switch ( direction ) {
            case 'up':
                if ( y == 0 ) {
                    if ( throughWalls ) {
                        y = gameBoard.height - 1;
                    } else {
                        stopGame();
                    }
                } else {
                    y--;
                }
                break;
            case 'down':
                if ( y == gameBoard.height - 1 ) {
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
                        x = gameBoard.width - 1;
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

        this.coordinates.unshift(`${y}_${x}`);
        
        if ( y == food.y && x == food.x ) {

            score++;
            currentScoreSpan.innerText = score;

            if ( score % acceleration == 0 ) {
                speed -= 5;
            }

            food.generate(gameBoard, this.coordinates);

        } else {
            this.coordinates.pop();
        }

    }
}

export { Snake }