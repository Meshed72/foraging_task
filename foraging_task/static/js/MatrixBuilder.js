class MatrixBuilder {
    constructor(taskManager) {
      this.SQUARE_SIZE = 20;
      this.NUM_ROWS = 25;
      this.NUM_COLS = 25;
      this.GREEN_PROPORTION = 0.8;
      this.RIPE_LIMIT = 0.5;
      this.GREEN_COLORS = ['#00FF00', '#33FF33', '#66FF66', '#99FF99', '#CCFFCC'];
      this.RED_COLORS = ['#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFCCCC'];
      this.RIPE_COLORS = [this.RED_COLORS[0]];

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

    //   const greenHue = Math.floor(Math.random() * 81) + 80;
    //   const saturation = Math.floor(Math.random() * 21) + 80;
    //   const saturation = 50;
    //   const saturation = Math.floor(Math.random() * 21) + 80;
    //   const lightness = 50;
    //   const lightness = Math.floor(Math.random() * 21) + 40;
    //   return `hsl(${greenHue}, ${saturation}%, ${lightness}%)`;
    }
  
    getRandomRedColor() {
        const randomIndex = Math.floor(Math.random() * this.RED_COLORS.length);
        return this.RED_COLORS[randomIndex];

        // let redHue;
        // if (Math.random() < this.RIPE_LIMIT) {
        //   redHue = Math.floor(Math.random() * 51) + 150;
        // } else {
        //   redHue = Math.floor(Math.random() * 21) + 340;
        // }
        // const saturation = 50;
        // const lightness = 50;
        // return `hsl(${redHue}, ${saturation}%, ${lightness}%)`;
      }
  
    drawMatrix(setEventListeners) {
        const totalSquares = this.NUM_ROWS * this.NUM_COLS;
        const numGreenSquares = Math.floor(totalSquares * this.GREEN_PROPORTION);
      
        // Create an array of indices representing all squares
        const indices = Array.from({ length: totalSquares }, (_, index) => index);
      
        // Shuffle the indices array randomly
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        this.squares = [];
      
        // Assign colors to squares based on shuffled indices
        for (let i = 0; i < totalSquares; i++) {
          const row = Math.floor(i / this.NUM_COLS);
          const col = i % this.NUM_COLS;
          const x = (this.canvasWidth - (this.SQUARE_SIZE * this.NUM_COLS)) / 2 + col * this.SQUARE_SIZE;
          const y = (this.canvasHeight - (this.SQUARE_SIZE * this.NUM_ROWS)) / 2 + row * this.SQUARE_SIZE;          
          var color;
          var colorType;
          if(indices[i] < numGreenSquares){
            color = this.getRandomGreenColor();  
            colorType = "green";          
          } else {
            color = this.getRandomRedColor()
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
        var rect = canvas.getBoundingClientRect();
        var clickX = event.clientX - rect.left;
        var clickY = event.clientY - rect.top;
        var isRipe = false;
  
        squares.forEach((square) => {
          if (
            clickX >= square.x &&
            clickX < square.x + square.size &&
            clickY >= square.y &&
            clickY < square.y + square.size
          ) {

            if(ripeColors.includes(square.color)){
                isRipe = true;
            }
            
            square.color = matrixBuilder.getRandomGreenColor();        
            ctx.fillStyle = square.color;
            ctx.fillRect(square.x, square.y, square.size, square.size);
    
            // Update click data
            taskManager.updateClickData({ subjectID : taskManager.subjectID, 
                startTime : taskManager.startTime, 
                clickTime : Date.now(), 
                patchNumber : taskManager.currentPatch, 
                x: square.x, 
                y: square.y, 
                isRipe : isRipe});
          }
        });
  
        // Play sound
        if(!isRipe){
            document.getElementById("errorSound").play();
        }        
      });
    }
  }
  