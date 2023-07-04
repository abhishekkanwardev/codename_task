from django.db import models

# Create your models here.

class Imageprediction(models.Model):
    neutral = models.CharField(max_length=50)
    sexy = models.CharField(max_length=50)
    drawing = models.CharField(max_length=50)
    porn = models.CharField(max_length=50)
    henai = models.CharField(max_length=50)
    image = models.ImageField(upload_to ='uploads/')

