from django.shortcuts import render
from rest_framework.permissions import AllowAny
import stripe
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core.mail import send_mail

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
                            'unit_amount':product.ticket_price,
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
        