from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

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
        user = self.model(email=email, phone_num=phone_num, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password=password, **extra_fields)

class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    phone_num = models.CharField(max_length=10)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    card_number = models.CharField(blank=True, max_length=19)
    card_exp_date = models.CharField(blank=True, max_length=5)
    card_cvv = models.CharField(blank=True, max_length=4)
    home_street = models.CharField(blank=True, max_length=100)
    home_city = models.CharField(blank=True, max_length=50)
    home_state = models.CharField(blank=True, max_length=2)
    zipcode = models.CharField(blank=True, max_length=9)

    # New fields
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_num', 'first_name', 'last_name']

    objects = AppUserManager()

    def __str__(self):
        return self.username
