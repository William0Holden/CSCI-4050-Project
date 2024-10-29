from django.db import models
from movie.models import Movie
from showing.models import Seat

class TypeIntChoice(models.IntegerChoices):
    CHILD = 1
    ADULT = 2
    SENIOR = 3

class PriceIntChoice(models.IntegerChoices):
    EIGHT = 8
    NINE = 9
    TEN = 10

class Ticket(models.Model):
    price = models.IntegerField(choices=PriceIntChoice.choices)
    type = models.IntegerField(choices=TypeIntChoice.choices)
    seat = Seat()
    
class Discount(models.Model):
    stripe_id = models.CharField(max_length=255, unique=True)
    percent_off = models.IntegerField()
    duration = models.CharField(max_length=255)
