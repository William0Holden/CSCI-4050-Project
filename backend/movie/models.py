from django.db import models
from user_api.models import AppUser
from django.core.exceptions import ValidationError
# Create your models here.

# DO NOT DELETE MODELS

# Run $python manage.py makemigrations then $python manage.py migrate after creating models


class Movie(models.Model):
    id = models.AutoField(primary_key=True)
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
    coming_soon = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    
class Showing(models.Model):
    date = models.CharField(max_length=100)
    time = models.CharField(max_length=100)
    showRoom = models.ForeignKey('ShowRoom', on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, related_name="showings", on_delete=models.CASCADE)
    
    def __str__(self):
        return self.movie.title + ' - ' + self.date + ' ' + self.time

class Booking(models.Model):
    tickets = models.ManyToManyField('Ticket', related_name='tickets_in_booking')
    cardUsed = models.CharField(max_length=100)
    datePlaced = models.DateTimeField(auto_now_add=True)
    showtime = models.ForeignKey(Showing, on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.showtime.movie.title + ' - ' + self.showtime.date + ' ' + self.showtime.time

class Ticket(models.Model):
    booking = models.ForeignKey(Booking,related_name= 'booking_for_ticket' ,on_delete=models.CASCADE)
    seat = models.ForeignKey('Seat', on_delete=models.CASCADE)
    TICKET_TYPE_CHOICES = [
        ('child', 'Child'),
        ('adult', 'Adult'),
        ('senior', 'Senior'),
    ]
    type = models.CharField(max_length=10, choices=TICKET_TYPE_CHOICES)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.seat.__str__() + ' - ' + self.type
    
class ShowRoom(models.Model):
    show_room_number = models.CharField(max_length=5)
    showings = models.ManyToManyField('Showing')
    seats = models.ManyToManyField('Seat', related_name='seats_in_showrooms')  # Updated related_name

    def __str__(self):
        return self.show_room_number

class Seat(models.Model):
    row = models.CharField(max_length=5)
    col = models.CharField(max_length=5)
    showroom = models.ForeignKey(ShowRoom, related_name='showroom_seats', on_delete=models.CASCADE)  # Updated related_name
    available = models.BooleanField()

    def __str__(self):
        return self.row + self.col
    
class SeatAssignment(models.Model):
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    showing = models.ForeignKey(Showing, on_delete=models.CASCADE)
    is_booked = models.BooleanField(default=False)  

    class Meta:
        unique_together = ('seat', 'showing')  

    def clean(self):
        overlapping_assignments = SeatAssignment.objects.filter(
            seat=self.seat,
            showing__date=self.showing.date,
            showing__time=self.showing.time
        ).exclude(pk=self.pk)
        if overlapping_assignments.exists():
            raise ValidationError("This seat is already assigned to another showing at the same time.")

    def __str__(self):
        return f"{self.seat} - {self.showing}"

class PaymentHistory(models.Model):
    user=models.ForeignKey(AppUser, on_delete=models.CASCADE, blank=True, null=True)
    products=models.ManyToManyField(Ticket)
    date=models.DateTimeField(auto_now_add=True)
    payment_status=models.BooleanField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return ', '.join([str(product) for product in self.products.all()])
    
class Coupon(models.Model):
    id=models.CharField(max_length=100, primary_key=True)
    percent_off=models.IntegerField()

    def __str__(self):
        return str(self.percent_off) + '%'
    
class Discount(models.Model):
    #coupon, can get id from this
    coupon=models.ForeignKey(Coupon, on_delete=models.CASCADE, unique=True)
    #customer-facing code
    code=models.CharField(max_length=100)

    def __str__(self):
        return self.code