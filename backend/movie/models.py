from django.db import models
from user_api.models import AppUser
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
    
class Booking(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.CharField(max_length=100) # temporary placeholder for users
    show_date_time = models.CharField(max_length=100)
    seat_number = models.CharField(max_length=10)
    booking_date_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.movie.title + ' - ' + self.show_date_time

class Ticket(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    ticket_number = models.CharField(max_length=10)
    ticket_type = models.CharField(max_length=10)
    ticket_price = models.DecimalField(max_digits=5, decimal_places=2)
    
    def __str__(self):
        return self.booking.movie.title + ' - ' + self.booking.show_date_time + ' - ' + self.ticket_number
    
class Showing(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    show_date_time = models.CharField(max_length=100)
    seat_numbers = models.TextField()
    
    def __str__(self):
        return self.movie.title + ' - ' + self.show_date_time
    
class ShowRoom(models.Model):
    show_room_number = models.CharField(max_length=5)
    seat_capacity = models.IntegerField()
    
    def __str__(self):
        return self.show_room_number
    
class Seat(models.Model):
    show_room = models.ForeignKey(ShowRoom, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=5)
    seat_type = models.CharField(max_length=10)
    seat_price = models.DecimalField(max_digits=5, decimal_places=2)
    
    def __str__(self):
        return self.show_room.show_room_number + ' - ' + self.seat_number
    
class PaymentHistory(models.Model):
    user=models.ForeignKey(AppUser, on_delete=models.CASCADE, blank=True, null=True)
    product=models.ForeignKey(Ticket, on_delete=models.SET_NULL, blank=True, null=True)
    date=models.DateTimeField(auto_now_add=True)
    payment_status=models.BooleanField()


    def __str__(self):
        return self.product.booking.movie.title + ' - ' + self.product.booking.show_date_time + ' - ' + self.product.ticket_number