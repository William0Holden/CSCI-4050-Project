# Generated by Django 5.1.1 on 2024-11-14 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0008_rename_booking_date_time_booking_dateplaced_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='coming_soon',
            field=models.BooleanField(default=False),
        ),
    ]
