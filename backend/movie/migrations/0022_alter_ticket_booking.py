# Generated by Django 5.1.1 on 2024-11-17 08:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0021_alter_ticket_booking'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='booking',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='booking_for_ticket', to='movie.booking'),
        ),
    ]