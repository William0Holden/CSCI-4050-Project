# import serializers from the REST framework
from rest_framework import serializers

# import the movie data model
from .models import Movie
from .models import Booking
from .models import Ticket
from .models import Showing
from .models import ShowRoom
from .models import Seat


# create a serializer class
class MovieSerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = Movie
        fields = ('id', 'title', 'category', 'cast', 'director', 'producer', 'synopsis', 'reviews', 'picture_url', 'trailer_url', 'mpaa_us_rating', 'show_dates_times')

class BookingSerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = Booking
        fields = ('id', 'movie', 'user', 'show_date_time', 'seat_number', 'booking_date_time')

class TicketSerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = Ticket
        fields = ('id', 'booking', 'ticket_number', 'ticket_type', 'ticket_price')

class ShowingSerializer(serializers.ModelSerializer):
    
        # create a meta class
        class Meta:
            model = Showing
            fields = ('id', 'movie', 'show_date_time', 'seat_numbers')

class ShowRoomSerializer(serializers.ModelSerializer):
        
            # create a meta class
            class Meta:
                model = ShowRoom
                fields = ('id', 'show_room_number', 'seat_capacity')

class SeatSerializer(serializers.ModelSerializer):
            
                # create a meta class
                class Meta:
                    model = Seat
                    fields = ('id', 'show_room', 'seat_number', 'seat_type', 'seat_price')
                    