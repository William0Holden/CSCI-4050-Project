# Generated by Django 5.1.1 on 2024-11-17 08:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0022_alter_ticket_booking'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='booking',
        ),
    ]
