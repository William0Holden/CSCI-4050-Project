from django.contrib import admin

# Register your models here.

from .models import Movie
from .models import Booking
from .models import Ticket
from .models import Showing
from .models import ShowRoom
from .models import Seat
from .models import PaymentHistory
from .models import Coupon
from .models import Discount


class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'director', 'producer', 'mpaa_us_rating')
    search_fields = ('title', 'category', 'director', 'producer', 'mpaa_us_rating')

admin.site.register(Movie, MovieAdmin)



class BookingAdmin(admin.ModelAdmin):
    list_display = ('movie', 'user', 'show_date_time', 'seat_number', 'booking_date_time')
    search_fields = ('movie', 'user', 'show_date_time', 'seat_number', 'booking_date_time')

admin.site.register(Booking, BookingAdmin)

class TicketAdmin(admin.ModelAdmin):
    list_display = ('booking', 'ticket_number', 'ticket_type', 'ticket_price')
    search_fields = ('booking', 'ticket_number', 'ticket_type', 'ticket_price')

admin.site.register(Ticket, TicketAdmin)

class ShowingAdmin(admin.ModelAdmin):
    list_display = ('movie', 'show_date_time', 'seat_numbers')
    search_fields = ('movie', 'show_date_time', 'seat_numbers')

admin.site.register(Showing, ShowingAdmin)

class ShowRoomAdmin(admin.ModelAdmin):
    list_display = ('show_room_number', 'seat_capacity')
    search_fields = ('show_room_number', 'seat_capacity')

admin.site.register(ShowRoom, ShowRoomAdmin)

class SeatAdmin(admin.ModelAdmin):
    list_display = ('show_room', 'seat_number', 'seat_type', 'seat_price')
    search_fields = ('show_room', 'seat_number', 'seat_type', 'seat_price')

admin.site.register(Seat, SeatAdmin)

admin.site.register(PaymentHistory)

class PaymentHistoryAdmin(admin.ModelAdmin):
    readonly_fields = ('user', 'product', 'date', 'payment_status')
    search_fields = ('user')

admin.site.register(Coupon)

class CouponAdmin(admin.ModelAdmin):
    list_display = ('id', 'percent_off')
    search_fields = ('id')

admin.site.register(Discount)

class DiscountAdmin(admin.ModelAdmin):
    list_display = ('coupon', 'code')
    search_fields = ('code')
