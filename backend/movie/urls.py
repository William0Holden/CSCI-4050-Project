from django.urls import path
from . import views

urlpatterns = [
    path('showrooms/', views.ShowRoomView.as_view({'get': 'list'}), name='showrooms'),
    path('showrooms/<int:id>/', views.ShowRoomView.as_view({'get': 'retrieve'}), name='showroom'), 
    path('showings/', views.ShowingView.as_view({'get': 'list'}), name='showing-list'), 
    path('showings/<int:pk>/', views.ShowingView.as_view({'get': 'retrieve'}), name='showing-detail'), 
]
