# Generated by Django 5.1.1 on 2024-11-17 08:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0023_remove_ticket_booking'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='booking',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='movie.booking'),
        ),
    ]
