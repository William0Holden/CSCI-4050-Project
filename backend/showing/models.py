from django.db import models
from movie.models import Movie

class Showing(models.Model):
    date = models.CharField(max_length=200)
    time = models.IntegerField()
    movie = Movie()
    seats = models.CharField(max_length=200)

class ShowRoom(models.Model):
    seats = models.CharField(max_length=200)
    roomNumber = models.IntegerField()

class Seat(models.Model):
    row = models.IntegerField()
    col = models.IntegerField()
    available = models.BooleanField(default=True)
