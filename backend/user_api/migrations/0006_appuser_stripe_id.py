# Generated by Django 5.1.1 on 2024-12-07 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0005_appuser_bookings'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='stripe_id',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
