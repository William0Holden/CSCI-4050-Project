# import serializers from the REST framework
from rest_framework import serializers
from .models import Movie, Booking, Ticket, Showing, ShowRoom, Seat, Coupon, Discount


# Create a serializer class for each model
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'category', 'cast', 'director', 'producer', 'synopsis', 'reviews', 'picture_url', 'trailer_url', 'mpaa_us_rating', 'show_dates_times', 'coming_soon')


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'tickets', 'cardUsed', 'datePlaced', 'showtime', 'user')


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('id', 'seat', 'type', 'price')


class ShowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Showing
        fields = ('id', 'movie', 'date', 'time', 'showRoom')


class ShowRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowRoom
        fields = ('id', 'show_room_number', 'seats')


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('id', 'row', 'col', 'available')


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ('id', 'percent_off')


class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ('coupon', 'code')
