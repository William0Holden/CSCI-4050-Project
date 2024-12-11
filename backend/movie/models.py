from django.db import models
from user_api.models import AppUser
from django.core.mail import EmailMessage
from django.db.models.signals import post_save
from django.dispatch import receiver
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

    def clean(self):
        # Check for overlapping showings in the same showroom
        conflicting_showings = Showing.objects.filter(
            showRoom=self.showRoom,
            date=self.date,
            time=self.time
        ).exclude(id=self.id)  # Exclude the current showing if it's an update

        if conflicting_showings.exists():
            raise ValidationError(f"A showing is already scheduled in this showroom on {self.date} at {self.time}.")

    def save(self, *args, **kwargs):
        self.clean()  # Run custom validation before saving
        super().save(*args, **kwargs)

class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    cardUsed = models.CharField(max_length=100)
    datePlaced = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    tickets = models.ManyToManyField('Ticket')

    def __str__(self):
        return self.user.username + ' - ' + self.datePlaced.strftime('%m/%d/%Y')

class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    seat = models.ForeignKey('Seat', on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)  # Attach a user to each ticket
    TICKET_TYPE_CHOICES = [
        ('child', 'Child'),
        ('adult', 'Adult'),
        ('senior', 'Senior'),
    ]
    type = models.CharField(max_length=10, choices=TICKET_TYPE_CHOICES)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    isBooked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.seat} - {self.type} ({self.user.username})"

class ShowRoom(models.Model):
    show_room_number = models.CharField(max_length=5)

    def __str__(self):
        return self.show_room_number

class Seat(models.Model):
    row = models.CharField(max_length=5)
    col = models.CharField(max_length=5)
    showroom = models.ForeignKey(ShowRoom, on_delete=models.CASCADE)
    showing = models.ForeignKey(Showing, on_delete=models.CASCADE)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.row + self.col

    def clean(self):
        # Prevent duplicate seats for the same showing
        duplicate_seat = Seat.objects.filter(
            row=self.row,
            col=self.col,
            showing=self.showing
        ).exclude(id=self.id)  # Exclude the current seat if it's an update

        if duplicate_seat.exists():
            raise ValidationError(f"Seat {self.row}{self.col} is already taken for this showing.")

    def save(self, *args, **kwargs):
        self.clean()  # Run custom validation before saving
        super().save(*args, **kwargs)

class PaymentHistory(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, blank=True, null=True)
    products = models.ManyToManyField(Ticket)
    date = models.DateTimeField(auto_now_add=True)
    payment_status = models.BooleanField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return ', '.join([str(product) for product in self.products.all()])

class Coupon(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    percent_off = models.IntegerField()

    def __str__(self):
        return str(self.percent_off) + '%'

class Discount(models.Model):
    # Coupon, can get id from this
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE, unique=True)
    # Customer-facing code
    code = models.CharField(max_length=100)

    def __str__(self):
        return self.code

@receiver(post_save, sender=Discount)
def send_discount_email(sender, instance, created, **kwargs):
    if created:  # Only send emails for newly created discounts
        all_users = AppUser.objects.all()  # Fetch all users
        percent_off = instance.coupon.percent_off
        code = instance.code

        for user in all_users:
            if user.promotions:
                username = user.username
                to_email = user.email
                subject = 'CINEMAEBOOKING PROMO CODE!!'
                message = (
                    f"Dear {username},\n\n"
                    f"Use promo code {code} for {percent_off}% off your next purchase!\n\n"
                    f"Happy watching,\nCinemaEBooking"
                )
                email = EmailMessage(subject, message, to=[to_email])
                try:
                    email.send()
                except Exception as e:
                    print(f"Error sending email to {to_email}: {e}")
