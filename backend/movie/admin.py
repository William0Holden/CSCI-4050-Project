from django.contrib import admin

# Register your models here.

from .models import Movie

class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'director', 'producer', 'mpaa_us_rating')
    search_fields = ('title', 'category', 'director', 'producer', 'mpaa_us_rating')

admin.site.register(Movie, MovieAdmin)