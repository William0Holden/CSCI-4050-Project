# Generated by Django 5.1.1 on 2024-11-16 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0017_seatassignment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='showroom',
            name='seats',
        ),
        migrations.RemoveField(
            model_name='showroom',
            name='showings',
        ),
        migrations.AlterField(
            model_name='seat',
            name='available',
            field=models.BooleanField(default=True),
        ),
    ]
