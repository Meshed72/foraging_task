from django.shortcuts import render

def task_base(request):
    return render(request, 'task_base.html')