from django.shortcuts import render
from rest_framework.permissions import AllowAny

# Create your views here.

from rest_framework import viewsets

# import the MovieSerializer from the serializer file
from .serializers import MovieSerializer
from .serializers import BookingSerializer
from .serializers import TicketSerializer
from .serializers import ShowingSerializer
from .serializers import ShowRoomSerializer
from .serializers import SeatSerializer


# import the Movie model from the models file
from .models import Movie
from .models import Booking
from .models import Ticket
from .models import Showing
from .models import ShowRoom
from .models import Seat


# create a class for the Movie model viewsets
class MovieView(viewsets.ModelViewSet):
    # define the permission classes
    permission_classes = [AllowAny]

    # create a serializer class and 
    # assign it to the MovieSerializer class
    serializer_class = MovieSerializer

    # define a variable and populate it 
    # with the Movie list objects
    queryset = Movie.objects.all()

# import the BookingSerializer from the serializer file
from .serializers import BookingSerializer
from .models import Booking

class BookingView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

class TicketView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

class ShowingView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ShowingSerializer
    queryset = Showing.objects.all()

class ShowRoomView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ShowRoomSerializer
    queryset = ShowRoom.objects.all()

class SeatView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = SeatSerializer
    queryset = Seat.objects.all()