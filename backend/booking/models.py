from django.db import models
from tickets.models import Ticket
from showing.models import Showing


class Booking(models.Model):
    tickets = Ticket()
    cardUsed = models.CharField(max_length=200)
    datePlaced = models.CharField(max_length=200)
    showTime = Showing()
    
