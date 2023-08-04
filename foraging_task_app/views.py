from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponseRedirect
import json
from .models import Task_clicks, Subjects
import pdb
from .forms import Oci_questionnaire_form, Dass_questionnaire_form, Aaq_questionnaire_form

def welcome_screen(request):
    return render(request, 'welcome_screen.html')

def foraging_task(request):
    return render(request, 'foraging_task.html')

def oci_questionnaire(request):
    form = Oci_questionnaire_form(request.POST)    
    if request.method == 'POST':             
            if form.is_valid():
                form.save()            
                return HttpResponseRedirect('/dass_questionnaire')
    else:
        form = Oci_questionnaire_form()

    return render(request, 'questionnaire_form.html', {'form': form,
                                                       'form_name' : 'oci'})

def dass_questionnaire(request):
    form = Dass_questionnaire_form(request.POST)    
    if request.method == 'POST':             
            if form.is_valid():
                form.save()            
                return HttpResponseRedirect('/aaq_questionnaire')
    else:
        form = Dass_questionnaire_form()

    return render(request, 'questionnaire_form.html', {'form': form,
                                                       'form_name' : 'dass'})

def aaq_questionnaire(request):
    form = Aaq_questionnaire_form(request.POST)    
    if request.method == 'POST':             
            if form.is_valid():
                form.save()            
                return HttpResponseRedirect('/foraging_task')
    else:
        form = Aaq_questionnaire_form()

    return render(request, 'questionnaire_form.html', {'form': form,
                                                       'form_name' : 'aaq'})

@csrf_exempt
def report_task_data(request):    
    # todo when running on prod, make sure no data is inserted in case the task is over and the subject id already exists
    subject_data = json.loads(request.body)["subject_data"]
    s = Subjects(subject_id=subject_data["subject_id"],
                 start_time=subject_data["start_time"],
                 study_id=subject_data["study_id"],
                 session_id=subject_data["session_id"],
                 is_valid=subject_data["is_valid"])
    s.save()
    
    for click in json.loads(request.body)["click_data"]:
        t = Task_clicks(subject_id=click["subjectId"], 
                        click_time=click["clickTime"],
                        is_ripe=click["isRipe"],
                        x=click["x"],
                        y=click["y"],
                        patch_number=click["patchNumber"])
        t.save()
    
    return JsonResponse({})
    