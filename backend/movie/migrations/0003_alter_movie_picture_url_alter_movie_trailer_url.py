# Generated by Django 5.1.1 on 2024-09-25 01:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0002_alter_movie_show_dates_times'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='picture_url',
            field=models.URLField(max_length=500),
        ),
        migrations.AlterField(
            model_name='movie',
            name='trailer_url',
            field=models.URLField(max_length=500),
        ),
    ]
