# Generated by Django 5.1.1 on 2024-11-14 20:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0007_coupon_remove_paymenthistory_product_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='booking',
            old_name='booking_date_time',
            new_name='datePlaced',
        ),
        migrations.RenameField(
            model_name='seat',
            old_name='seat_number',
            new_name='col',
        ),
        migrations.RenameField(
            model_name='showing',
            old_name='show_date_time',
            new_name='date',
        ),
        migrations.RenameField(
            model_name='ticket',
            old_name='ticket_price',
            new_name='price',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='movie',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='seat_number',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='show_date_time',
        ),
        migrations.RemoveField(
            model_name='seat',
            name='seat_price',
        ),
        migrations.RemoveField(
            model_name='seat',
            name='seat_type',
        ),
        migrations.RemoveField(
            model_name='seat',
            name='show_room',
        ),
        migrations.RemoveField(
            model_name='showing',
            name='seat_numbers',
        ),
        migrations.RemoveField(
            model_name='showroom',
            name='seat_capacity',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='booking',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='ticket_number',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='ticket_type',
        ),
        migrations.AddField(
            model_name='booking',
            name='cardUsed',
            field=models.CharField(default=1234567890, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='booking',
            name='showtime',
            field=models.ForeignKey(default=12, on_delete=django.db.models.deletion.CASCADE, to='movie.showing'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='booking',
            name='tickets',
            field=models.ManyToManyField(to='movie.ticket'),
        ),
        migrations.AddField(
            model_name='seat',
            name='available',
            field=models.BooleanField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='seat',
            name='row',
            field=models.CharField(default=1, max_length=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='showing',
            name='showRoom',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='movie.showroom'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='showing',
            name='time',
            field=models.CharField(default=12, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='showroom',
            name='seats',
            field=models.ManyToManyField(to='movie.seat'),
        ),
        migrations.AddField(
            model_name='ticket',
            name='seat',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='movie.seat'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ticket',
            name='type',
            field=models.CharField(choices=[('child', 'Child'), ('adult', 'Adult'), ('senior', 'Senior')], default=1, max_length=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='booking',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
