from django.urls import path
from . import views
from django.urls import include

urlpatterns = [
	path('showings/<int: id>', views.ShowingView.as_view(), name='showing'),
    path('showrooms/<int: id', views.ShowRoomView.as_view(), name='showroom'),
    path('seats/<int: id', views.SeatView.as_view(), name='seat'),
    path('movie/<str: title', views.MovieView.as_view(), name='movie'),
]
