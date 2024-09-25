from django.db import models

# Create your models here.

# DO NOT DELETE MODELS

# Run $python manage.py makemigrations then $python manage.py migrate after creating models


class Movie(models.Model):
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    cast = models.TextField()
    director = models.CharField(max_length=100)
    producer = models.CharField(max_length=100)
    synopsis = models.TextField()
    reviews = models.TextField()
    picture_url = models.URLField(max_length=500)
    trailer_url = models.URLField(max_length=500)
    mpaa_us_rating = models.CharField(max_length=5)
    show_dates_times = models.TextField()
    
    def __str__(self):
        return self.title