from django.shortcuts import render
from rest_framework.permissions import AllowAny
import stripe
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.conf import settings


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
from .models import PaymentHistory


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

class BookingView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = BookingSerializer

    def post (self, request):
        booking_data = request.data
        booking_serializer = BookingSerializer(data=booking_data)
        if booking_serializer.is_valid():
            booking = booking_serializer.save()
            return Response(BookingSerializer(booking).data, status=201)
        return Response(booking_serializer.errors, status=400)
    def get_by_user(self, request, user_id=None):
        bookings = Booking.objects.filter(user_id=user_id)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=200)

    queryset = Booking.objects.all()


class TicketView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = TicketSerializer

    def post (self, request):
        ticket_data = request.data
        ticket_serializer = TicketSerializer(data=ticket_data)
        if ticket_serializer.is_valid():
            ticket = ticket_serializer.save()
            return Response(TicketSerializer(ticket).data, status=201)
        return Response(ticket_serializer.errors, status=400)

    queryset = Ticket.objects.all()

class ShowingView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ShowingSerializer
    queryset = Showing.objects.all()

class ShowRoomView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ShowRoomSerializer
    queryset = ShowRoom.objects.all()

class SeatView(viewsets.ViewSet):  # Use ViewSet instead of ModelViewSet for custom methods

    permission_classes = [AllowAny]
    serializer_class = SeatSerializer

    def post(self, request):
        seat_data = request.data
        seat_serializer = SeatSerializer(data=seat_data)
        
        if seat_serializer.is_valid():
            seat = seat_serializer.save()
            return Response(SeatSerializer(seat).data, status=201)
        return Response(seat_serializer.errors, status=400)

    def list(self, request):
        seats = Seat.objects.all()
        seat_serializer = SeatSerializer(seats, many=True)
        return Response(seat_serializer.data, status=200)

    def retrieve(self, request, pk=None):
        try:
            seat = Seat.objects.get(pk=pk)
            seat_serializer = SeatSerializer(seat)
            return Response(seat_serializer.data, status=200)
        except Seat.DoesNotExist:
            return Response({'error': 'Seat not found'}, status=404)
        
    def get_by_showing(self, request, showing_id=None):
        seats = Seat.objects.filter(showing_id=showing_id)
        seat_serializer = SeatSerializer(seats, many=True)
        return Response(seat_serializer.data, status=200)
    
    

from .serializers import CouponSerializer
from .models import Coupon
class CouponView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()

from .serializers import DiscountSerializer
from .models import Discount
class DiscountView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = DiscountSerializer
    queryset = Discount.objects.all()

def send_promo(request, user, to_email, percent_off, code):
    username = user.username
    subject='CINEMAEBOOKING PROMO CODE!!',
    message=f'Dear {username},\nUse promo code {code} for {percent_off} off your purchase!'
    email = EmailMessage(subject, message, to=[to_email])
    try:
        email.send()
    except:
        print("error sending email")

def send_return_conf(request, user, to_email):
    username = user.username
    subject='Return Successful',
    message=f'Dear {username},\nYour return was processed, and you should be receiving a full refund shortly. Thank you for booking with us!'
    email = EmailMessage(subject, message, to=[to_email])
    try:
        email.send()
    except:
        print("error sending email")

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateStripeCheckoutSession(APIView):
    #sending product id from frontend
    def post(self, request, *args, **kwargs):
        prod_id = self.kwargs['pk']
        try:
            product = Ticket.objects.get(id=prod_id)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data':{
                            'currency':'usd',
                            'unit_amount':int(product.ticket_price)*100,
                            'product_data':{
                                'booking':product.booking,
                                'ticket number':product.ticket_number,
                                'ticket type':product.ticket_type
                            }
                        },
                        'quantity':1,
                    },
                ],
                metadata={
                    'product_id':product.id
                },
                allow_promotion_codes=True,
                automatic_tax={'enabled': True},
                mode = 'payment',
                success_url='http://localhost:3000/' + '?success=true',
                cancel_url='http://localhost:3000/' + '?canceled=true',
            )
            return redirect(checkout_session.url, code=303)
        except Exception as e:
            return Response({'msg':'something went wrong while creating stripe session','error':str(e)}, status=500)

@csrf_exempt
def stripe_webhook_view(request):
    payload = request.body
    endpoint = settings.STRIPE_WEBHOOK_SECRET
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint
        )
    except ValueError as e:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        return HttpResponse(status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        print(session)
        customer_email=session['customer_details']['email']
        prod_id=session['metadata']['product_id']
        product=Ticket.objects.get(id=prod_id)
        #sending confimation mail
        send_mail(
            subject="payment sucessful",
            message=f"thank for your purchase. your order is ready.",
            recipient_list=[customer_email],
            from_email="cinemaebooker@gmail.com"
        )

        #creating payment history
        PaymentHistory.objects.create(product=product, payment_status=True)
    return HttpResponse(status=200)
        
class CreatePaymentIntent(APIView):
    def post(self, request, *args, **kwargs):
        prod_id = request.data
        if prod_id is not None:
            product = Ticket.objects.get(id=prod_id)
            try:
                intent = stripe.PaymentIntent.create(
                    amount = int(product.ticket_price)*100,
                    currency='usd',
                    automatic_payment_methods={
                        'enabled':True,
                    },
                    metadata={
                        'product_id':product.id
                    }
                )
                return Response({'clientSecret':intent['client_secret']}, status=200)
            except Exception as e:
                return Response({'error':str(e)}, status=400)