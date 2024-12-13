# Generated by Django 5.1.1 on 2024-11-16 03:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0014_remove_movie_show_dates_times_showing_movie'),
    ]

    operations = [
        migrations.AddField(
            model_name='seat',
            name='showroom',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='showroom_seats', to='movie.showroom'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='showroom',
            name='showings',
            field=models.ManyToManyField(to='movie.showing'),
        ),
        migrations.AlterField(
            model_name='showroom',
            name='seats',
            field=models.ManyToManyField(related_name='seats_in_showrooms', to='movie.seat'),
        ),
    ]
