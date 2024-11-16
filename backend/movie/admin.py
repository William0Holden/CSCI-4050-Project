from django.contrib import admin
from .models import Movie, Booking, Ticket, Showing, ShowRoom, Seat, PaymentHistory, Coupon, Discount, SeatAssignment


class ShowingInline(admin.TabularInline):  
    model = Showing
    extra = 1  

class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'director', 'producer', 'mpaa_us_rating')
    search_fields = ('title', 'category', 'director', 'producer', 'mpaa_us_rating')

    inlines = [ShowingInline]


admin.site.register(Movie, MovieAdmin)

class BookingAdmin(admin.ModelAdmin):
    list_display = ('get_movie_title', 'user', 'get_show_date_time', 'get_seat_numbers', 'datePlaced')
    search_fields = ('user__username', 'get_movie_title')

    def get_movie_title(self, obj):
        return obj.showtime.movie.title
    get_movie_title.short_description = 'Movie Title'

    def get_show_date_time(self, obj):
        return f"{obj.showtime.date} {obj.showtime.time}"
    get_show_date_time.short_description = 'Show Date and Time'

    def get_seat_numbers(self, obj):
        return ', '.join([str(ticket.seat) for ticket in obj.tickets.all()])
    get_seat_numbers.short_description = 'Seat Numbers'

admin.site.register(Booking, BookingAdmin)

class TicketAdmin(admin.ModelAdmin):
    list_display = ('seat', 'type', 'price')
    search_fields = ('seat__row', 'seat__col', 'type')

admin.site.register(Ticket, TicketAdmin)

class SeatAssignmentInline(admin.TabularInline):
    model = SeatAssignment
    extra = 0
    readonly_fields = ('seat',)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "seat":
            if hasattr(request, "showing_instance"):
                showing_instance = request.showing_instance
                kwargs["queryset"] = Seat.objects.filter(showroom=showing_instance.showRoom)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class ShowingAdmin(admin.ModelAdmin):
    list_display = ('get_show_date_time', 'get_showroom_number')
    search_fields = ('movie__title', 'date', 'time')

    def get_show_date_time(self, obj):
        return f"{obj.date} {obj.time}"
    get_show_date_time.short_description = 'Show Date and Time'

    def get_showroom_number(self, obj):
        return obj.showRoom.show_room_number
    get_showroom_number.short_description = 'Show Room Number'

    inlines = [SeatAssignmentInline]

    def get_form(self, request, obj=None, **kwargs):
        request.showing_instance = obj
        return super().get_form(request, obj, **kwargs)

admin.site.register(Showing, ShowingAdmin)

class ShowRoomAdmin(admin.ModelAdmin):
    list_display = ('show_room_number', 'get_seat_capacity')
    search_fields = ('show_room_number',)

    def get_seat_capacity(self, obj):
        return obj.seats.count()
    get_seat_capacity.short_description = 'Seat Capacity'

admin.site.register(ShowRoom, ShowRoomAdmin)

class SeatAdmin(admin.ModelAdmin):
    list_display = ('row', 'col', 'available', 'showroom')
    search_fields = ('row', 'col')

admin.site.register(Seat, SeatAdmin)

class PaymentHistoryAdmin(admin.ModelAdmin):
    readonly_fields = ('user', 'products', 'date', 'payment_status')
    search_fields = ('user__username',)

admin.site.register(PaymentHistory, PaymentHistoryAdmin)

class CouponAdmin(admin.ModelAdmin):
    list_display = ('id', 'percent_off')
    search_fields = ('id',)

admin.site.register(Coupon, CouponAdmin)

class DiscountAdmin(admin.ModelAdmin):
    list_display = ('coupon', 'code')
    search_fields = ('code',)

admin.site.register(Discount, DiscountAdmin)
