from django.contrib import admin
from .models import (
    Movie, Booking, Ticket, Showing, ShowRoom, Seat, PaymentHistory, Coupon, Discount)

# Inline for Showing within Movie
class ShowingInline(admin.TabularInline):
    model = Showing
    extra = 1  # Display 1 empty form by default


# Admin for Movie
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'director', 'producer', 'mpaa_us_rating')
    search_fields = ('title', 'category', 'director', 'producer', 'mpaa_us_rating')

    inlines = [ShowingInline]  # Add ShowingInline


admin.site.register(Movie, MovieAdmin)

class SeatInline(admin.TabularInline):
    model = Seat
    extra = 1  # Display 1 empty form by default


# Admin for Showing
class ShowingAdmin(admin.ModelAdmin):
    list_display = ('get_show_date_time', 'get_showroom_number')
    search_fields = ('movie__title', 'date', 'time')
    inlines = [SeatInline]  # Add SeatInline

    def get_show_date_time(self, obj):
        return f"{obj.date} {obj.time}"
    get_show_date_time.short_description = 'Show Date and Time'

    def get_showroom_number(self, obj):
        return obj.showRoom.show_room_number
    get_showroom_number.short_description = 'Show Room Number'

    def get_form(self, request, obj=None, **kwargs):
        request.showing_instance = obj  # Pass showing instance to inline forms
        return super().get_form(request, obj, **kwargs)


admin.site.register(Showing, ShowingAdmin)

class TicketInline(admin.TabularInline):
    model = Ticket
    extra = 1  # Display 1 empty form by default


# Admin for Booking
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'datePlaced', 'get_tickets')

    def get_tickets(self, obj):
        return ', '.join([str(ticket) for ticket in obj.tickets.all()])
    
    search_fields = ('user__username', 'datePlaced', 'cardUsed')


admin.site.register(Booking, BookingAdmin)


# Admin for Ticket
class TicketAdmin(admin.ModelAdmin):
    list_display = ('seat', 'type', 'price', 'user', 'isBooked')
    search_fields = ('seat__row', 'seat__col', 'type')


admin.site.register(Ticket, TicketAdmin)


# Admin for ShowRoom
class ShowRoomAdmin(admin.ModelAdmin):
    list_display = ('show_room_number',)
    search_fields = ('show_room_number',)
    inlines = [SeatInline]  # Add SeatInline


admin.site.register(ShowRoom, ShowRoomAdmin)


# Admin for Seat
class SeatAdmin(admin.ModelAdmin):
    list_display = ('row', 'col', 'available', 'showroom', 'showing')
    search_fields = ('row', 'col')


admin.site.register(Seat, SeatAdmin)


# Admin for PaymentHistory
class PaymentHistoryAdmin(admin.ModelAdmin):
    readonly_fields = ('user', 'products', 'date', 'payment_status')
    search_fields = ('user__username',)


admin.site.register(PaymentHistory, PaymentHistoryAdmin)


# Admin for Coupon
class CouponAdmin(admin.ModelAdmin):
    list_display = ('id', 'percent_off')
    search_fields = ('id',)


admin.site.register(Coupon, CouponAdmin)


# Admin for Discount
class DiscountAdmin(admin.ModelAdmin):
    list_display = ('coupon', 'code')
    search_fields = ('code',)


admin.site.register(Discount, DiscountAdmin)

