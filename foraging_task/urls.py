"""
URL configuration for foraging_task project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from foraging_task_app.views import foraging_task, report_task_data, questionnaire_form, welcome_screen

urlpatterns = [    
    path('', welcome_screen, name='welcome_screen'),
    path('questionnaire_form', questionnaire_form, name='questionnaire_form'),
    path('foraging_task', foraging_task, name='foraging_task'),
    path('report_task_data', report_task_data, name='report_task_data'),
]
