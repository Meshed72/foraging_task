class MatrixBuilder{
    constructor(taskManager){
        this.SQUARE_SIZE = 20;
        this.NUM_ROWS = 25;
        this.NUM_COLS = 25;
        this.taskManager = taskManager;
    }

    init(){
        this.canvas =  document.getElementById("matrixCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvasWidth = this.SQUARE_SIZE * this.NUM_COLS;
        this.canvasHeight = this.SQUARE_SIZE * this.NUM_ROWS;

        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        this.squares = [];

        this.drawMatrix();  
        return this;      
    } 

    getRandomColor(){
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    drawMatrix(){
        for (let row = 0; row < this.NUM_ROWS; row++) {
            for (let col = 0; col < this.NUM_COLS; col++) {
                const x = (this.canvasWidth - (this.SQUARE_SIZE * this.NUM_COLS)) / 2 + col * this.SQUARE_SIZE;
                const y = (this.canvasHeight - (this.SQUARE_SIZE * this.NUM_ROWS)) / 2 + row * this.SQUARE_SIZE;
                const color = this.getRandomColor();
            
                const square = {
                    x: x,
                    y: y,
                    size: this.SQUARE_SIZE,
                    color: color
                };
            
                this.squares.push(square);

                this.squares.forEach(square => {
                    this.ctx.fillStyle = square.color;
                    this.ctx.fillRect(square.x, square.y, square.size, square.size);
                });
            }
        }
        this.setSquaresEventListeners();
    }

    resetSquaresColor(){
        this.squares.forEach(square => {
            this.ctx.fillStyle = this.getRandomColor();
            this.ctx.fillRect(square.x, square.y, square.size, square.size);
        });
    }

    setSquaresEventListeners(){
        var canvas = this.canvas;
        var ctx = this.ctx;
        var taskManager = this.taskManager;
        var squares = this.squares;

        canvas.addEventListener('click', function(event) {
            const rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;
        
            // Change the square's color
            squares.forEach(square => {
            if (
                clickX >= square.x &&
                clickX < square.x + square.size &&
                clickY >= square.y &&
                clickY < square.y + square.size
            ) {
                ctx.fillStyle = this.getRandomColor();
                ctx.fillRect(square.x, square.y, square.size, square.size);
                
                // Update click data
                taskManager.updateClickData({ x: square.x, y: square.y })
            }                                                                                                             
            // Play sound
            document.getElementById("errorSound").play();
        
            });
        });
    }
    
}