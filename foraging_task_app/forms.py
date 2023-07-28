# forms.py

from django import forms
from .models import Oci_questionnaire

class Oci_questionnaire_form(forms.ModelForm):
    class Meta:
        model = Oci_questionnaire
        fields = '__all__'
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if field_name.startswith('question_'):
                field.widget = forms.RadioSelect(attrs={'class':'some_class'})
                field.choices = self.Meta.model.STATEMENT_CHOICES
                field.label = self.Meta.model.questions[field_name]
                field.initial = 0
                field.required = True
            elif field_name =='subject_id':
                field.widget = forms.HiddenInput()
                field.label = ""
                field.initial="defaultUser"
                field.required = True
