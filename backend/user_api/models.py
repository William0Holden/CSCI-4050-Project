from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail, EmailMessage

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
        user.set_password(password) # automatically hashes the password
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
    card_number2 = models.CharField(blank=True, max_length=19)
    card_exp_date2 = models.CharField(blank=True, max_length=5)
    card_cvv2 = models.CharField(blank=True, max_length=4)
    card_number3 = models.CharField(blank=True, max_length=19)
    card_exp_date3 = models.CharField(blank=True, max_length=5)
    card_cvv3 = models.CharField(blank=True, max_length=4)
    home_street = models.CharField(blank=True, max_length=100)
    home_city = models.CharField(blank=True, max_length=50)
    home_state = models.CharField(blank=True, max_length=2)
    zipcode = models.CharField(blank=True, max_length=9)
    promotions = models.BooleanField(default=False)

    # New fields
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_num', 'first_name', 'last_name']

    objects = AppUserManager()

    def __str__(self):
        return self.username

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    # the below like concatinates your websites reset password url and the reset email token which will be required at a later stage
    email_plaintext_message = "Open the link to reset your password" + " " + "{}{}".format(instance.request.build_absolute_uri("http://localhost:3000/reset-password-form/"), reset_password_token.key)
    
    """
        takes up some parameter (title(email title), message(email body), from(email sender), to(recipient(s))
    """
    send_mail(
        # title:
        "Password Reset for {title}".format(title="Crediation portal account"),
        # message:
        email_plaintext_message,
        # from:
        "cinemaebooker@gmail.com",
        # to:
        [reset_password_token.user.email],
        fail_silently=False,
    )
