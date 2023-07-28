function initExperimentManager(){    
    experimentManager = new ExperimentManager();
}

class ExperimentManager{
    constructor(){        
        const urlParams = new URLSearchParams(window.location.search);

        this.prolificData = {}
        this.prolificData["PROLIFIC_PID"] = urlParams.get('PROLIFIC_PID');
        this.prolificData["STUDY_ID"] = urlParams.get('STUDY_ID');
        this.prolificData["SESSION_ID"] = urlParams.get('SESSION_ID');
    }
}