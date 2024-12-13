from django.urls import path
from . import views
from django.urls import include

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('edit/<str:pk>', views.UserEdit.as_view(), name='edit'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('activate/<uidb64>/<token>', views.activate, name='activate'),
    path('users', views.UserList.as_view(), name='users'),
    path('update-stripe-id/<int:user_id>', views.UpdateStripeId.as_view(), name='update-stripe-id'),
]