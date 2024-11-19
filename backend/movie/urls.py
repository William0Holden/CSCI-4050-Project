from django.urls import path
from . import views


urlpatterns = [
    path('showrooms/', views.ShowRoomView.as_view({'get': 'list'}), name='showrooms'),
    path('showrooms/<int:pk>/', views.ShowRoomView.as_view({'get': 'retrieve'}), name='showroom'), 
    path('showings/', views.ShowingView.as_view({'get': 'list'}), name='showing-list'), 
    path('showings/<int:pk>/', views.ShowingView.as_view({'get': 'retrieve'}), name='showing-detail'), 
    path('seats/', views.SeatView.as_view({'post': 'post', 'get': 'list'}), name='seat-list'),  # Handles both GET and POST for seats
    path('seats/<int:pk>/', views.SeatView.as_view({'get': 'retrieve'}), name='seat-detail'),
    path('tickets/', views.TicketView.as_view({'get': 'list'}), name='ticket-list'),
    path('tickets/<int:pk>/', views.TicketView.as_view({'get': 'retrieve'}), name='ticket-detail'),
    path('bookings/', views.BookingView.as_view({'get': 'list'}), name='booking-list'),
    path('bookings/<int:pk>/', views.BookingView.as_view({'get': 'retrieve'}), name='booking-detail'),
    path('bookings/user/<int:user_id>/', views.BookingView.as_view({'get': 'get_by_user'}), name='booking-by-user'),
]

