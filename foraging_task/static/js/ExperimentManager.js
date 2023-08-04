function initExperimentManager(){    
    experimentManager = new ExperimentManager();
}

class ExperimentManager{
    constructor(){        
        const urlParams = new URLSearchParams(window.location.search);
        sessionStorage.setItem("PROLIFIC_PID", urlParams.get('PROLIFIC_PID'));
        sessionStorage.setItem("STUDY_ID", urlParams.get('STUDY_ID'));
        sessionStorage.setItem("SESSION_ID", urlParams.get('SESSION_ID'));     
    }
}

function navigateTo(page){
    window.location.href = "/" + page
}

function initQuiestionnaire(name){
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

    document.getElementById("oci_instructions").style.display = "none";
    document.getElementById("dass_instructions").style.display = "none";
    document.getElementById("aaq_instructions").style.display = "none";

    var intructionsText;
    if(name == 'oci'){
        document.getElementById("oci_instructions").style.display = "block";                
    } else if(name == 'dass'){
        document.getElementById("dass_instructions").style.display = "block";
    } else if(name == 'aaq'){
        document.getElementById("aaq_instructions").style.display = "block";
    }
}

function initTask(){
    document.querySelector('.circle').style.display = "none";
    taskManager = new TaskManager()
    taskManager.init();
  }
