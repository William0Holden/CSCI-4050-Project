from django.contrib import admin
from .models import AppUser

class AppUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'phone_num', 'first_name', 'last_name', 'promotions', 'is_staff', 'is_active', 'home_street', 'home_city', 'home_state', 'zipcode')
    search_fields = ('email', 'username', 'phone_num', 'first_name', 'last_name', 'home_street', 'home_city', 'home_state', 'zipcode')
    list_filter = ('is_staff', 'is_active', 'promotions')
    readonly_fields = ('card_number', 'card_exp_date', 'card_cvv', 'card_number2', 'card_exp_date2', 'card_cvv2', 'card_number3', 'card_exp_date3', 'card_cvv3')

admin.site.register(AppUser, AppUserAdmin)
