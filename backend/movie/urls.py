from django.urls import path
from . import views

urlpatterns = [
    path('showrooms/', views.ShowRoomView.as_view({'get': 'list'}), name='showrooms'),
    path('showrooms/<int:pk>/', views.ShowRoomView.as_view({'get': 'retrieve'}), name='showroom'), 
    path('showings/', views.ShowingView.as_view({'get': 'list'}), name='showing-list'), 
    path('showings/<int:pk>/', views.ShowingView.as_view({'get': 'retrieve'}), name='showing-detail'), 
    path('seats/', views.SeatView.as_view({'post': 'post', 'get': 'list'}), name='seat-list'),  # Handles both GET and POST for seats
    path('seats/<int:pk>/', views.SeatView.as_view({'get': 'retrieve'}), name='seat-detail'),
]
