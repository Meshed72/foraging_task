class MatrixBuilder {
    constructor(taskManager) {
      this.SQUARE_SIZE = 20;
      this.NUM_ROWS = 25;
      this.NUM_COLS = 25;
      this.taskManager = taskManager;
    }
  
    init() {
      this.canvas = document.getElementById("matrixCanvas");
      this.ctx = this.canvas.getContext("2d");
  
      this.canvasWidth = 500;
      this.canvasHeight = 500;
  
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
  
      this.squares = [];
  
      this.drawMatrix();
      return this;
    }
  
    static getRandomGreenColor() {
      const greenHue = Math.floor(Math.random() * 81) + 80;
      const saturation = Math.floor(Math.random() * 21) + 80;
      const lightness = Math.floor(Math.random() * 21) + 40;
      return `hsl(${greenHue}, ${saturation}%, ${lightness}%)`;
    }
  
    static getRandomRedColor() {
      const redHue = Math.floor(Math.random() * 21) + 340;
      const saturation = Math.floor(Math.random() * 21) + 80;
      const lightness = Math.floor(Math.random() * 21) + 40;
      return `hsl(${redHue}, ${saturation}%, ${lightness}%)`;
    }
  
    drawMatrix(greenProportion = 0.5) {
        const totalSquares = this.NUM_ROWS * this.NUM_COLS;
        const numGreenSquares = Math.floor(totalSquares * greenProportion);
        const numRedSquares = totalSquares - numGreenSquares;
      
        // Create an array of indices representing all squares
        const indices = Array.from({ length: totalSquares }, (_, index) => index);
      
        // Shuffle the indices array randomly
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
      
        // Assign colors to squares based on shuffled indices
        for (let i = 0; i < totalSquares; i++) {
          const row = Math.floor(i / this.NUM_COLS);
          const col = i % this.NUM_COLS;
          const x = (this.canvasWidth - (this.SQUARE_SIZE * this.NUM_COLS)) / 2 + col * this.SQUARE_SIZE;
          const y = (this.canvasHeight - (this.SQUARE_SIZE * this.NUM_ROWS)) / 2 + row * this.SQUARE_SIZE;          
          var color;
          var colorType;
          if(indices[i] < numGreenSquares){
            color = MatrixBuilder.getRandomGreenColor();  
            colorType = "green";          
          } else {
            color = MatrixBuilder.getRandomRedColor()
            colorType = "red";
          }
      
          const square = {
            x: x,
            y: y,
            size: this.SQUARE_SIZE,
            color: color,
            colorType : colorType
          };
      
          this.squares.push(square);
          this.ctx.fillStyle = square.color;
          this.ctx.fillRect(square.x, square.y, square.size, square.size);
        }
      
        this.setSquaresEventListeners();
      }
      
  
    resetSquaresColor() {
      this.squares.forEach((square) => {
        if (square.colorType == "green") {
          square.color = MatrixBuilder.getRandomGreenColor();
        } else {
          square.color = MatrixBuilder.getRandomRedColor();
        }
        this.ctx.fillStyle = square.color;
        this.ctx.fillRect(square.x, square.y, square.size, square.size);
      });
    }
  
    setSquaresEventListeners() {
      const canvas = this.canvas;
      const ctx = this.ctx;
      const taskManager = this.taskManager;
      const squares = this.squares;
  
      canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
  
        squares.forEach((square) => {
          if (
            clickX >= square.x &&
            clickX < square.x + square.size &&
            clickY >= square.y &&
            clickY < square.y + square.size
          ) {
            
            square.color = MatrixBuilder.getRandomGreenColor();        
            ctx.fillStyle = square.color;
            ctx.fillRect(square.x, square.y, square.size, square.size);
  
            // Update click data
            taskManager.updateClickData({ x: square.x, y: square.y });
          }
        });
  
        // Play sound
        document.getElementById("errorSound").play();
      });
    }
  }
  