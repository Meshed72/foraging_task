function initTask(){
    taskManager = new TaskManager("testUser")
    taskManager.init();
}

class TaskManager{
    constructor(subjectId){
        this.TOTAL_DURATION = 5000;
        this.subjectId = subjectId;
        this.startTime = Date.now();
        this.intervalDuration = 100;        
        this.numIntervals = 100;
        this.progressInterval;
        this.progressWidth = 0;
        this.clickData = [];
        this.currentPatch = 1;
        this.progressBar = document.querySelector(".progress-bar");
        this.progressFill =  document.getElementById("progressFill");
        this.stopTaskButton =  document.querySelector(".stop-task-button");
        this.nextPatchButton =  document.querySelector(".next-patch-button");
        this.startTaskButton =  document.querySelector(".start-task-button");
        this.taskText =  document.querySelector(".task-text");
        this.matrixBuilder = new MatrixBuilder(this);
        return this;
    }

    init(){ 
        this.taskElementsVisibility("instructions");        
    }

    startTask(){
        this.taskElementsVisibility("taskRun");
        this.matrixBuilder.init();
        this.setProgressBar();
    }

    endTask(){
        this.taskElementsVisibility("taskEnd");
    }

    taskElementsVisibility(phase){
        if(phase == "instructions"){
            this.taskRelatedElementsVisibility("none");
            this.taskText.style.display = "block";
            this.taskText.innerHTML = "Instructions for the task";
            this.startTaskButton.style.display = "block";
        }
        if(phase == "taskRun"){
            this.taskRelatedElementsVisibility("block");
            this.taskText.style.display = "none";
            this.startTaskButton.style.display = "none";
        }
        if(phase == "taskEnd"){
            this.taskRelatedElementsVisibility("none");
            this.taskText.style.display = "block";
            this.taskText.innerHTML = "Task finished - thank you";
        }
    }

    taskRelatedElementsVisibility(visibility){
        if(visibility == "block"){
            this.matrixBuilder.showMatrix();
        } else {
            this.matrixBuilder.hideMatrix();
        }
        this.progressBar.style.display = visibility;
        this.stopTaskButton.style.display = visibility; 
        this.nextPatchButton.style.display = visibility;
    }

    setProgressBar() {        
        this.progressFill.style.width = "0";
        this.progressInterval = setInterval(() => this.updateProgress(), this.intervalDuration);
    }

    updateProgress() {
        const elapsedTime = Date.now() - this.startTime;
        const progressBarWidth = this.progressBar.offsetWidth;
        const targetWidth = (progressBarWidth / this.TOTAL_DURATION) * elapsedTime;

        if (this.progressFill.offsetWidth >= this.progressBar.offsetWidth) {
            this.progressFill.style.width = `${progressBarWidth}px`;
            clearInterval(this.progressInterval);
            // this.endTask();
        } else {
            this.progressWidth = (targetWidth / progressBarWidth) * 100;
            this.progressFill.style.width = `${this.progressWidth}%`;
        }
    }

    updateClickData(data) {
        console.log(data);
        this.clickData.push(data);
    }

    clickNextPatch(){
        this.matrixBuilder.resetSquaresColor();
        this.currentPatch++;
    }
}