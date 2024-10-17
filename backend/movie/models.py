from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


# Create your models here.

# DO NOT DELETE MODELS

# Run $python manage.py makemigrations then $python manage.py migrate after creating models

class AppUserManager(BaseUserManager):
	def create_user(self, email, phone_num, first_name, last_name, password=None, **extra_fields):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		if not phone_num:
			raise ValueError("A phone number is required.")
		if not first_name:
			raise ValueError("A first name is required.")
		if not last_name:
			raise ValueError("A last name is required.")
		email = self.normalize_email(email)
		user = self.model(email=email, phone_num = phone_num, first_name = first_name, last_name = last_name, **extra_fields)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password, **extra_fields)
		user.is_superuser = True
		user.save()
		return user

class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	phone_num = models.CharField(max_length=10)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	card_number = models.CharField(blank=True, max_length=19) # need to figure out how to make it required
	card_exp_date = models.CharField(blank=True, max_length=5)
	card_cvv = models.CharField(blank=True, max_length=4)
	home_street = models.CharField(blank=True, max_length=100)
	home_city = models.CharField(blank=True, max_length=50)
	home_state = models.CharField(blank=True, max_length=2)
	zipcode = models.CharField(blank=True, max_length=9)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username','phone_num','first_name','last_name']
	objects = AppUserManager()
	def __str__(self):
		return self.username



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