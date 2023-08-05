class MatrixBuilder {
    constructor(taskManager) {
      this.SQUARE_SIZE = TaskParams.SQUARE_SIZE;
      this.NUM_ROWS = TaskParams.MATRIX_SIZE;
      this.NUM_COLS = TaskParams.MATRIX_SIZE;
      this.GREEN_PROPORTION = 1 - TaskParams.BERRIES_PROP;
      this.RIPE_LIMIT = TaskParams.RIPE_PROP;
      this.GREEN_COLORS = TaskParams.GREEN_COLORS;
      this.RED_COLORS = TaskParams.RED_COLORS;
      this.RIPE_COLORS = [this.RED_COLORS[0], this.RED_COLORS[1], this.RED_COLORS[2]];

      this.taskManager = taskManager;
      this.canvas = document.getElementById("matrixCanvas");
      this.ctx = this.canvas.getContext("2d");
  
      this.canvasWidth = 500;
      this.canvasHeight = 500;
  
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
  
      this.squares = [];
      return this;
    }
  
    init() {
      this.drawMatrix(true);
    }

    hideMatrix(){
        this.canvas.style.display = "none";
    }

    showMatrix(){
        this.canvas.style.display = "block";
    }
  
    getRandomGreenColor() {    
        const randomIndex = Math.floor(Math.random() * this.GREEN_COLORS.length);
        return this.GREEN_COLORS[randomIndex];
    }
  
    getRandomRedColor(isRipe) {
      if (isRipe) {
        const randomIndex = Math.floor(Math.random() * this.RIPE_COLORS.length);
        return this.RIPE_COLORS[randomIndex];
      }
  
      const randomIndex = Math.floor(Math.random() * this.RED_COLORS.length);
      return this.RED_COLORS[randomIndex];   
    }
  
    drawMatrix(setEventListeners) {
        const totalSquares = this.NUM_ROWS * this.NUM_COLS;
        const numGreenSquares = Math.floor(totalSquares * this.GREEN_PROPORTION);
        const numRedSquares = Math.floor(totalSquares - numGreenSquares);
        const ripeLimitIndex = Math.floor(this.RIPE_LIMIT * numRedSquares);
      
        // Create an array of indices representing all squares
        const squareIndices = Array.from({ length: totalSquares }, (_, index) => index);
      
        // Shuffle the indices array randomly
        for (let i = squareIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [squareIndices[i], squareIndices[j]] = [squareIndices[j], squareIndices[i]];
        }

        // Create an array of indices representing all red colors
        var redIndices = Array.from({ length: numRedSquares}, (_, index) => index);
      
        // Shuffle the indices array randomly
        for (let i = redIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [redIndices[i], redIndices[j]] = [redIndices[j], redIndices[i]];
        }        

        this.squares = [];
      
        // Assign colors to squares based on shuffled indices
        var redIndex = 0;
        for (let i = 0; i < totalSquares; i++) {
          const row = Math.floor(i / this.NUM_COLS);
          const col = i % this.NUM_COLS;
          const x = (this.canvasWidth - (this.SQUARE_SIZE * this.NUM_COLS)) / 2 + col * this.SQUARE_SIZE;
          const y = (this.canvasHeight - (this.SQUARE_SIZE * this.NUM_ROWS)) / 2 + row * this.SQUARE_SIZE;          
          var color;
          var colorType;

          if(squareIndices[i] < numGreenSquares){
            color = this.getRandomGreenColor();  
            colorType = "green";          
          } else {
            redIndex++;
            if(redIndices[redIndex] < ripeLimitIndex){
              color = this.getRandomRedColor(true);
            } else {
              color = this.getRandomRedColor(false);
            }        
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
      
        if(setEventListeners){
            this.setSquaresEventListeners();
        }    
      }
      
  
    resetSquaresColor() {     
        // Remove existing event listeners   
        let canvasElement = document.getElementById("matrixCanvas");        
        var newCanvasElement = canvasElement.cloneNode(true);
        canvasElement.parentNode.replaceChild(newCanvasElement, canvasElement);
        this.canvas = newCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        // this = new MatrixBuilder();
        this.drawMatrix(true);
    }
  
    setSquaresEventListeners() {
      var canvas = this.canvas;
      var ctx = this.ctx;
      var taskManager = this.taskManager;
      var squares = this.squares;
      var matrixBuilder = this;
      const ripeColors = this.RIPE_COLORS;
  
      canvas.addEventListener("click", function (event) {
        if(taskManager.clickDisabled){
          return;
        }

        taskManager.clickDisabled = true;
        setTimeout(function(){taskManager.clickDisabled = false;}, TaskParams.PICK_DELAY);

        var rect = canvas.getBoundingClientRect();
        var clickX = event.clientX - rect.left;
        var clickY = event.clientY - rect.top;
        var isRipe = false;
        var isGreen = false;
        var squareColor;
  
        squares.forEach((square) => {
          if (
            clickX >= square.x &&
            clickX < square.x + square.size &&
            clickY >= square.y &&
            clickY < square.y + square.size
          ) {

            isRipe = ripeColors.includes(square.color);
            isGreen = matrixBuilder.GREEN_COLORS.includes(square.color);
            
            squareColor = square.color;                            
            if(matrixBuilder.RED_COLORS.includes(square.color)){
              square.color = matrixBuilder.getRandomGreenColor();        
            }
            
            ctx.fillStyle = square.color;
            ctx.fillRect(square.x, square.y, square.size, square.size);                        

            // Update click data
            taskManager.updateClickData({ subjectId : taskManager.subjectId, 
                clickTime : Date.now(), 
                patchNumber : taskManager.currentPatch, 
                x: square.x, 
                y: square.y, 
                color: square.color,
                isRipe : isRipe,
                isGreen: isGreen});
          }
        });
  
        // Play sound
        if(isRipe && matrixBuilder.RED_COLORS.includes(squareColor)){
          document.getElementById("correctSound").play();        
        } else if(!isRipe && matrixBuilder.RED_COLORS.includes(squareColor)) {
          document.getElementById("errorSound").play();
        } else {
          document.getElementById("neutralSound").play();
        }       
      });
    }
  }
  