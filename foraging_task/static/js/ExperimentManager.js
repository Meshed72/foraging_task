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

function goToQuestionnaire(){
    window.location.href = "/questionnaire_form"
}

function initQuiestionnaire(){
    document.querySelector("[name=subject_id]").value = sessionStorage.getItem("PROLIFIC_PID");

    // Set all radio boxes to have no value selected
    const radioBoxes = document.querySelectorAll('input[type="radio"]');
    radioBoxes.forEach(radio => {
        radio.checked = false;
        radio.addEventListener('click', (event) => {
            const item = event.target.name;
            const value = event.target.value;    
            // Update the value of the clicked radio button
            document.querySelector(`input[name="${item}"][value="${value}"]`).checked = true;            
        });
    });
}

function initTask(){
    document.querySelector('.circle').style.display = "none";
    taskManager = new TaskManager()
    taskManager.init();
  }
