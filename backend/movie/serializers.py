# import serializers from the REST framework
from rest_framework import serializers

# import the movie data model
from .models import Movie

# create a serializer class
class MovieSerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = Movie
        fields = ('id', 'title', 'category', 'cast', 'director', 'producer', 'synopsis', 'reviews', 'picture_url', 'trailer_url', 'mpaa_us_rating', 'show_dates_times')
