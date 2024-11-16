from django.core.exceptions import ValidationError

class SeatAssignment(models.Model):
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    showing = models.ForeignKey(Showing, on_delete=models.CASCADE)
    is_booked = models.BooleanField(default=False)

    class Meta:
        unique_together = ('seat', 'showing')

    def clean(self):
        overlapping_assignments = SeatAssignment.objects.filter(
            seat=self.seat,
            showing__date=self.showing.date,
            showing__time=self.showing.time
        ).exclude(pk=self.pk)
        if overlapping_assignments.exists():
            raise ValidationError("This seat is already assigned to another showing at the same time.")
