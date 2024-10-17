from django.contrib import admin

# Register your models here.

from .models import AppUser

class AppUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'phone_num', 'first_name', 'last_name', 'card_number', 'card_exp_date', 'card_cvv', 'home_street', 'home_city', 'home_state', 'zipcode')
    search_fields = ('email', 'username', 'phone_num', 'first_name', 'last_name', 'card_number', 'card_exp_date', 'card_cvv', 'home_street', 'home_city', 'home_state', 'zipcode')

admin.site.register(AppUser, AppUserAdmin)