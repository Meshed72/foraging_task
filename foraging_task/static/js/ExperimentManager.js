function initExperimentManager(){    
    experimentManager = new ExperimentManager();
}

class ExperimentManager{
    constructor(){        
        const urlParams = new URLSearchParams(window.location.search);
        // sessionStorage.setItem("PROLIFIC_PID", urlParams.get('PROLIFIC_PID'));
        // sessionStorage.setItem("STUDY_ID", urlParams.get('STUDY_ID'));
        // sessionStorage.setItem("SESSION_ID", urlParams.get('SESSION_ID'));     
        
        sessionStorage.setItem("PROLIFIC_PID", "PROLIFIC_PID");
        sessionStorage.setItem("STUDY_ID", "STUDY_ID");
        sessionStorage.setItem("SESSION_ID", "SESSION_ID");
    }
}