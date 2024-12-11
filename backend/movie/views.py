from django.shortcuts import render
from rest_framework.permissions import AllowAny
import stripe
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.conf import settings
import json
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.exceptions import ValidationError

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
    queryset = Ticket.objects.all()

    def put(self, request, pk=None):
        try:
            ticket = Ticket.objects.get(pk=pk)
            ticket.isBooked = True
            ticket.save()
            return Response(TicketSerializer(ticket).data, status=200)
        except Ticket.DoesNotExist:
            return Response({'error': 'Ticket not found'}, status=404)

    def post(self, request):
        ticket_data = request.data
        ticket_serializer = TicketSerializer(data=ticket_data)
        if ticket_serializer.is_valid():
            try:
                ticket = ticket_serializer.save(user=request.user)  # Attach user to ticket
                return Response(TicketSerializer(ticket).data, status=201)
            except Exception as e:
                return Response({'error': str(e)}, status=400)
        return Response(ticket_serializer.errors, status=400)

    def get_by_user(self, request, user_id):
        tickets = Ticket.objects.filter(user_id=user_id, isBooked=False)
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)

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
            try:
                seat = seat_serializer.save()
                return Response(SeatSerializer(seat).data, status=201)
            except ValidationError as e:
                return Response({'error': str(e)}, status=400)
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

@csrf_exempt
def attach_payment_method(request):
    if request.method == "POST":
        try:
            data = json.loads(request.data)
            payment_method_id = data.get("paymentMethodId")
            customer_id = data.get("customerId")

            payment_method = stripe.PaymentMethod.attach(
                payment_method_id,
                customer = customer_id
            )

            stripe.Customer.modify(
                customer_id,
                invoice_settings={"default_payment_method": payment_method_id},
            )

            return JsonResponse({"success": True, "paymentMethod": payment_method})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})
    return JsonResponse({"success": False, "error": "Invalid request method"})


@method_decorator(csrf_exempt, name='dispatch')
class CreateStripeCheckoutSession(APIView):
    def post(self, request, *args, **kwargs):
        bookingId = self.kwargs['pk']
        try:
            # Get the booking by ID
            booking = Booking.objects.get(id=bookingId)

            # Use the related manager to access tickets
            tickets = booking.tickets.all()
            
            childAmt = adultAmt = seniorAmt = 0

            # Calculate quantities for each ticket type
            for ticket in tickets:
                if ticket.type == "child":
                    childAmt += 1
                elif ticket.type == "adult":
                    adultAmt += 1
                elif ticket.type == "senior":
                    seniorAmt += 1

            # Prepare line items dynamically
            line_items = []
            if childAmt > 0:
                line_items.append({
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': 6 * 100,
                        'product_data': {'name': 'Child Ticket'},
                    },
                    'quantity': childAmt,
                })
            if adultAmt > 0:
                line_items.append({
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': 8 * 100,
                        'product_data': {'name': 'Adult Ticket'},
                    },
                    'quantity': adultAmt,
                })
            if seniorAmt > 0:
                line_items.append({
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': 7 * 100,
                        'product_data': {'name': 'Senior Ticket'},
                    },
                    'quantity': seniorAmt,
                })

            # Create Stripe Checkout session
            checkout_session = stripe.checkout.Session.create(
                line_items=line_items,
                allow_promotion_codes=True,
                automatic_tax={'enabled': False}, # can't be used without origin address
                mode='payment',
                success_url='http://localhost:3000/bookings/?success=true',
                cancel_url='http://localhost:3000/bookings/?canceled=true',
                customer_email=booking.user.email,
            )
            
            # Return response with CORS headers
            response = JsonResponse({'url': checkout_session.url,
                                     'sessionid': checkout_session.id})
            response["Access-Control-Allow-Origin"] = "http://localhost:3000"
            response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type"
            return response

        except Exception as e:
            response = JsonResponse({'msg': 'Error creating Stripe session', 'error': str(e)}, status=500)
            response["Access-Control-Allow-Origin"] = "http://localhost:3000"
            response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type"
            return response
        
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
        PaymentHistory.objects.create(product=product, payment_status=True)
    return HttpResponse(status=200)

@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
    amount=1000, currency='pln', 
    payment_method_types=['card'],
    receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)
        
'''
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
                '''