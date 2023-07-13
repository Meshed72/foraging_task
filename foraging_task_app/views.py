from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
import json
# from .models import Task_clicks, Subjects

def task_base(request):
    return render(request, 'task_base.html')

# @csrf_exempt
# def report_task_data(request):    
#     subject_data = json.loads(request.body)["subject_data"]
#     s = Subjects(subject_id=subject_data["subject_id"],
#                  start_time=subject_data["start_time"])
#     s.save()
    
#     for click in json.loads(request.body)["click_data"]:
#         t = Task_clicks(subject_id=click["subjectId"], 
#                         click_time=click["clickTime"],
#                         is_ripe=click["isRipe"],
#                         x=click["x"],
#                         y=click["y"],
#                         patch_number=click["patchNumber"])
#         t.save()
    
#     return JsonResponse({})
    