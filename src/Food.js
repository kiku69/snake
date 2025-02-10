class Food {

    y;
    x;
    emojis;
    emoji;

    constructor( emojis ) {

        this.emojis = emojis;

    }


    generate (gameBoard, snakeCoordinates) {
    
        do {
            this.y = Math.floor(Math.random() * height);
            this.x = Math.floor(Math.random() * width);
        } while ( snakeCoordinates.includes(`${this.y}_${this.x}`) );
    
        index = Math.floor(Math.random() * this.emojis.lenght);
        emoji = this.emojis[index];

    }

}

export { Food }