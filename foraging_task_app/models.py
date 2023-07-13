# from datetime import timezone
# from django.db import models

# class Subjects(models.Model):
#     subject_id = models.CharField(max_length=30)
#     start_time = models.BigIntegerField(default='NA')
    
#     class Meta:
#         db_table  = 'subjects'
        
# class Task_clicks(models.Model):
#     subject_id = models.CharField(max_length=30)
#     click_time = models.BigIntegerField()
#     patch_number = models.IntegerField()
#     x = models.IntegerField()
#     y = models.IntegerField()
#     is_ripe = models.BooleanField()
    
#     class Meta:
#         db_table  = 'task_clicks'