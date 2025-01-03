# Generated by Django 5.1.1 on 2024-11-16 21:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0018_remove_showroom_seats_remove_showroom_showings_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='seat',
            name='showing',
            field=models.ManyToManyField(through='movie.SeatAssignment', to='movie.showing'),
        ),
        migrations.AlterField(
            model_name='seat',
            name='showroom',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.showroom'),
        ),
    ]
