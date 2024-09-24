from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets

# import the MovieSerializer from the serializer file
from .serializers import MovieSerializer

# import the Movie model from the models file
from .models import Movie

# create a class for the Movie model viewsets
class MovieView(viewsets.ModelViewSet):

    # create a serializer class and 
    # assign it to the MovieSerializer class
    serializer_class = MovieSerializer

    # define a variable and populate it 
    # with the Movie list objects
    queryset = Movie.objects.all()