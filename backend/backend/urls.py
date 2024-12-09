"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

from django.views.decorators.csrf import csrf_exempt

# add include to the path
from django.urls import path, include

# import views from movie
from movie import views
from movie.views import CreateStripeCheckoutSession
from movie.views import stripe_webhook_view
#from movie.views import CreatePaymentIntent

# import routers from the REST framework
# it is necessary for routing
from rest_framework import routers

# create a router object
router = routers.DefaultRouter()

# register the router
router.register(r'movies',views.MovieView, 'movie')

urlpatterns = [
    path('admin/', admin.site.urls),

    # add another path to the url patterns
    # when you visit the localhost:8000/api
    # you should be routed to the django Rest framework
    path('api/', include(router.urls)),
    path('api/', include('user_api.urls')),
    path('api/', include('movie.urls')),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('create-checkout-session/<pk>/', csrf_exempt(CreateStripeCheckoutSession.as_view()), name='checkout_session'),
    path('stripe-webhook/', stripe_webhook_view, name='stripe-webhook'),
    #path('create-payment-intent/', CreatePaymentIntent.as_view(), name='payment-intent'),
]