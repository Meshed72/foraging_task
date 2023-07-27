from datetime import timezone
from django.db import models

class Subjects(models.Model):
    subject_id = models.CharField(max_length=30)
    start_time = models.BigIntegerField(default='NA')
    is_valid = models.BooleanField(default='False')
    
    class Meta:
        db_table  = 'subjects'
        
class Task_clicks(models.Model):
    subject_id = models.CharField(max_length=30)
    click_time = models.BigIntegerField()
    patch_number = models.IntegerField()
    x = models.IntegerField()
    y = models.IntegerField()
    is_ripe = models.BooleanField()
    
    class Meta:
        db_table  = 'task_clicks'
        
class Oci_questionnaire(models.Model):
    class Meta:
        db_table  = 'oci_questionnaire'
        
    questions = {
        "question_1" : "1. I have saved up so many things that they get in the way.",
        "question_2" : "2. I check things more often than necessary.",
        "question_3" : "3. I get upset if objects are not arranged properly.",
        "question_4" : "4. I feel compelled to count while I am doing things.",
        "question_5" : "5. I find it difficult to touch an object when I know it has been touched by strangers or certain people.",
        "question_6" : "6. I find it difficult to control my own thoughts.",
        "question_7" : "7. I collect things I don’t need.",
        "question_8" : "8. I repeatedly check doors, windows, drawers, etc.",
        "question_9" : "9. I get upset if others change the way I have arranged things.",
        "question_10" : "10. I feel I have to repeat certain numbers.",
        "question_11" : "11. I sometimes have to wash or clean myself simply because I feel contaminated.",
        "question_12" : "12. I am upset by unpleasant thoughts that come into my mind against my will.",
        "question_13" : "13. I avoid throwing things away because I am afraid I might need them later.",
        "question_14" : "14. I repeatedly check gas and water taps and light switches after turning them off.",
        "question_15" : "15. I need things to be arranged in a particular way.",
        "question_16" : "16. I feel that there are good and bad numbers.",
        "question_17" : "17. I wash my hands more often and longer than necessary.",
        "question_18" : "18. I frequently get nasty thoughts and have difficulty in getting rid of them."
    }
    
    STATEMENT_CHOICES = (
        (0, "Not at all"),
        (1, "A little"),
        (2, "Moderately"),
        (3, "A lot"),
        (4, "Extremely"),
    )

    subject_id = models.CharField(max_length=50)
    question_1 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_2 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_3 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_4 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_5 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_6 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_7 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_8 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_9 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_10 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_11 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_12 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_13 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_14 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_15 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_16 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_17 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_18 = models.IntegerField(choices=STATEMENT_CHOICES)

    def __str__(self):
        return f"Questionnaire {self.subject_id}"
