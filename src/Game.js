class Game {

    messageDiv = document.getElementById('message');
    highScoreSpan = document.getElementById('high-score');
    currentScoreSpan = document.getElementById('current-score');
    resetGameBtn = document.getElementById('reset-game')

    score = 0;
    highScore;
    speed = 200;
    direction;
    intervalId;
    gameBoard;
    snake;
    food;
    throughWalls;
    acceleration;

    constructor (gameBoard, snake, food, throughWalls, acceleration ) {

        this.gameBoard = gameBoard;
        this.snake = snake;
        this.food = food;

        this

    }

    init ( gameBoard, snake, food ) {



        this.direction = 'up';
        this.speed = 200;
        
        this.highScore = localStorage.getItem('snakeHighScore') ?? 0;
        this.highScoreSpan.innerText = this.highScore;
        
        this.score = 0;
        this.currentScoreSpan.innerText = this.score;

        this.food.generate(this, this.gameBoard, snake);

        this.messageDiv.innerText = '';
        this.resetGameBtn.classList.add('hidden');

        this.intervalId = setInterval(this.run.bind(this), this.speed);
}

run () {
    clearInterval(this.intervalId);
    this.snake.update(this, this.gameBoard, this.food, this.direction, this.throughWalls, this.stopGame, this.acceleration, this.speed);
    this.gameBoard.draw(this.snake, this.food);

    if ( this.isGameOver() ) {
        this.stop();
    } else {
        intervalId = setInterval(this.run.bind(this), this.speed);
    }
}
    
updateScore () {

}

}

stop () {

    clearInterval(intervalId);
    this.messageDiv.innerText = 'Mäng läbi!';
    this.resetGameBtn.classList.remove('hidden');

    if ( score > highScore ) {
        localStorage.setItem('snakeHighScore', score);
    }

}

export { Game }