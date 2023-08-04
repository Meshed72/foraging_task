from datetime import timezone
from django.db import models

class Subjects(models.Model):
    subject_id = models.CharField(max_length=30)
    study_id = models.CharField(max_length=30, default='NA')
    session_id = models.CharField(max_length=30, default='NA')
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
        (0, "0"),
        (1, "1"),
        (2, "2"),
        (3, "3"),
        (4, "4"),
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
    
class Dass_questionnaire(models.Model):
    class Meta:
        db_table  = 'dass_questionnaire'
        
    questions = {
        "question_1" : "1. I found it hard to wind down",
        "question_2" : "2. I was aware of dryness of my mouth",
        "question_3" : "3. I couldn’t seem to experience any positive feeling at all",
        "question_4" : "4. I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)",
        "question_5" : "5. I found it difficult to work up the initiative to do things",
        "question_6" : "6. I tended to over-react to situations",
        "question_7" : "7. I experienced trembling (e.g. in the hands)",
        "question_8" : "8. I felt that I was using a lot of nervous energy",
        "question_9" : "9. I was worried about situations in which I might panic and make a fool of myself",
        "question_10" : "10. I felt that I had nothing to look forward to",
        "question_11" : "11. I found myself getting agitated",
        "question_12" : "12. I found it difficult to relax",
        "question_13" : "13. I felt down-hearted and blue",
        "question_14" : "14. I was intolerant of anything that kept me from getting on with what I was doing",
        "question_15" : "15. I felt I was close to panic",
        "question_16" : "16. I was unable to become enthusiastic about anything",
        "question_17" : "17. I felt I wasn’t worth much as a person",
        "question_18" : "18. I felt that I was rather touchy",
        "question_19" : "19. I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)",
        "question_20" : "20. I felt scared without any good reason",
        "question_21" : "21. I felt that life was meaningless"
    }
    
    STATEMENT_CHOICES = (
        (0, "0"),
        (1, "1"),
        (2, "2"),
        (3, "3")
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
    question_19 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_20 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_21 = models.IntegerField(choices=STATEMENT_CHOICES)

    def __str__(self):
        return f"Questionnaire {self.subject_id}"
    
class Aaq_questionnaire(models.Model):
    class Meta:
        db_table  = 'aaq_questionnaire'
        
    questions = {
        "question_1" : "1. My painful experiences and memories make it difficult for me to live a life that I would value.",
        "question_2" : "2. I’m afraid of my feelings.",
        "question_3" : "3. I worry about not being able to control my worries and feelings.",
        "question_4" : "4. My painful memories prevent me from having a fulfilling life.",
        "question_5" : "5. Emotions cause problems in my life.",
        "question_6" : "6. It seems like most people are handling their lives better than I am.",
        "question_7" : "7. Worries get in the way of my success.",
    }
    
    STATEMENT_CHOICES = (
        (0, "0"),
        (1, "1"),
        (2, "2"),
        (3, "3"),
        (4, "4"),
        (5, "5"),
        (6, "6"),
        (7, "7"),
    )

    subject_id = models.CharField(max_length=50)
    question_1 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_2 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_3 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_4 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_5 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_6 = models.IntegerField(choices=STATEMENT_CHOICES)
    question_7 = models.IntegerField(choices=STATEMENT_CHOICES)

    def __str__(self):
        return f"Questionnaire {self.subject_id}"
