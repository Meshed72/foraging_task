function initTask(){
    taskManager = new TaskManager().init();
}

class TaskManager{
    constructor(){
        this.TOTAL_DURATION = 5000;
        this.intervalDuration = 100;        
        this.numIntervals = 100;
        this.progressInterval;
        this.progressWidth = 0;
        this.clickData = [];
        this.currentPatch = 1;
        this.matrixBuilder = new MatrixBuilder(this).init();
    }

    init(){
        this.setProgressBar();
        return this;
    }

    setProgressBar() {
        const progressFill = document.getElementById("progressFill");
        const progressBar = document.querySelector(".progress-bar");
        this.startTime = Date.now();
        progressFill.style.width = "0";
        this.progressInterval = setInterval(() => this.updateProgress(progressFill, progressBar), this.intervalDuration);
    }

    updateProgress(progressFill, progressBar) {
        const elapsedTime = Date.now() - this.startTime;
        const progressBarWidth = progressBar.offsetWidth;
        const targetWidth = (progressBarWidth / this.TOTAL_DURATION) * elapsedTime;

        if (progressFill.offsetWidth >= progressBar.offsetWidth) {
            progressFill.style.width = `${progressBarWidth}px`;
            clearInterval(this.progressInterval);
            alert("Times up");
        } else {
            this.progressWidth = (targetWidth / progressBarWidth) * 100;
            progressFill.style.width = `${this.progressWidth}%`;
        }
    }

    updateClickData(data) {
        this.clickData.push(data);
    }

    updateClickData(data){
        this.clickData.push(data);
    }

    clickNextPatch(){
        this.matrixBuilder.resetSquaresColor();
        this.currentPatch++;
    }
}