class TaskManager{
    constructor(){
        this.TOTAL_DURATION = TaskParams.TOTAL_DURATION * 1000;
        this.subjectId = sessionStorage.getItem("PROLIFIC_PID");
        this.startTime = Date.now();
        this.travelDuration = 100;        
        this.numIntervals = 100;
        this.progressInterval;
        this.progressWidth = 0;
        this.clickData = [];
        this.currentPatch = 1;
        this.progressBar = document.querySelector(".progress-bar");
        this.progressFill =  document.getElementById("progressFill");
        // this.stopTaskButton =  document.querySelector(".stop-task-button");
        this.nextPatchButton =  document.querySelector(".next-patch-button");
        this.startTaskButton =  document.querySelector(".start-task-button");
        this.instructionsText =  document.querySelector(".instructions-text");
        this.instructionsImg =  document.querySelector("[alt='Instructions Image']");
        this.endText =  document.querySelector(".end-text");
        this.travelCircle =  document.querySelector(".circle");
        this.matrixBuilder = new MatrixBuilder(this);
        this.clickDisabled = false;
        this.elapsedTime;
        this.isValid = 0;
        this.currentFillWidth = 0;
        this.fillWidthSpeedFactor = 0.01;

        //"Travel" animation
        const fillElement = document.querySelector('.fill');
        fillElement.addEventListener('animationend', () => {
            document.querySelector('.circle').style.display = "none";
            taskManager.matrixBuilder.showMatrix();
            this.nextPatchButton.style.display = "block";
        });

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

    clickNextPatch(){
        document.querySelector('.circle').style.display = "block";
        taskManager.matrixBuilder.hideMatrix();
        this.nextPatchButton.style.display = "none";
        this.matrixBuilder.resetSquaresColor();
        this.currentPatch++;
    }

    endTask(){
        // this.taskElementsVisibility("taskEnd");        
        this.reportTaskData();
        window.location.href = "/oci_questionnaire"
    }

    taskElementsVisibility(phase){
        if(phase == "instructions"){
            this.taskRelatedElementsVisibility("none");
            this.instructionsText.style.display = "block";
            this.startTaskButton.style.display = "block";
        }
        if(phase == "taskRun"){
            this.taskRelatedElementsVisibility("block");
            this.instructionsImg.style.display = "none";
            this.instructionsText.style.display = "none";
            this.startTaskButton.style.display = "none";
        }
        if(phase == "taskEnd"){
            this.taskRelatedElementsVisibility("none");
            this.endText.style.display = "block";
            this.travelCircle.style.display = "none";
        }
    }

    taskRelatedElementsVisibility(visibility){
        if(visibility == "block"){
            this.matrixBuilder.showMatrix();
        } else {
            this.matrixBuilder.hideMatrix();
        }
        this.progressBar.style.display = visibility;
        // this.stopTaskButton.style.display = visibility; 
        this.nextPatchButton.style.display = visibility;        
    }

    setProgressBar() {        
        this.progressFill.style.width = "0";
        this.progressInterval = setInterval(() => this.updateProgress(), 1000 * this.fillWidthSpeedFactor);
    }

    updateProgress() {
        this.elapsedTime = Date.now() - this.startTime;
        const progressBarWidth = this.progressBar.offsetWidth;
        const fillRatio = 1000 * this.fillWidthSpeedFactor / this.TOTAL_DURATION;
        const fillWidthUnit = fillRatio * progressBarWidth;

        if (this.elapsedTime >= this.TOTAL_DURATION) {
            clearInterval(this.progressInterval);
            this.progressFill.style.width = `${progressBarWidth}px`;            
            this.isValid = 1;            
            this.endTask();
        } else {
            this.currentFillWidth += fillWidthUnit;
            this.progressFill.style.width = `${this.currentFillWidth}px`;
        }
    }

    updateClickData(data) {
        console.log(data);
        this.clickData.push(data);
    }

    reportTaskData(){
        var xhr = new XMLHttpRequest();
        var url = "/report_task_data";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {                
                console.log("Data sent");
            }
        };

        var subjectData = {"subject_id" : this.subjectId, "start_time" : this.startTime, "is_valid" : this.isValid,
        "study_id" : sessionStorage.getItem("STUDY_ID"), "session_id" : sessionStorage.getItem("SESSION_ID"),};

        var data = JSON.stringify({"click_data" : this.clickData, "subject_data" : subjectData});
        xhr.send(data); 
    }
}