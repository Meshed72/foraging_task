function initTask(){
    taskManager = new TaskManager().init();
}

class TaskManager{
    constructor(){
        this.intervalDuration = 100;
        this.totalDuration = 5000;
        this.clickData = [];
        this.currentPatch = 1;
        this.matrixBuilder = new MatrixBuilder(this).init();
    }

    init(){
        this.setProgressBar();
        return this;
    }

    setProgressBar(){
        const progressFill = document.getElementById("progressFill");
        let progress = 0;        
        const numIntervals = this.totalDuration / this.intervalDuration;

        function updateProgress() {            
            progress += 100 / numIntervals;
            progressFill.style.width = progress + "%";            

            if (progress < 100) {
                console.log(progressFill.style.width);
                setTimeout(updateProgress, this.intervalDuration);
            } 
        }

        setTimeout(updateProgress, this.intervalDuration);
    }

    updateClickData(data){
        this.clickData.push(data);
    }

    clickNextPatch(){
        this.matrixBuilder.resetSquaresColor();
        this.currentPatch++;
    }
}