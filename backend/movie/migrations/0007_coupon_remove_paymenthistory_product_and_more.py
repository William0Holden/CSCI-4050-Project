# Generated by Django 5.1.1 on 2024-11-14 04:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0006_paymenthistory'),
    ]

    operations = [
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('percent_off', models.IntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='paymenthistory',
            name='product',
        ),
        migrations.AddField(
            model_name='paymenthistory',
            name='products',
            field=models.ManyToManyField(to='movie.ticket'),
        ),
        migrations.AddField(
            model_name='paymenthistory',
            name='total_amount',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=100)),
                ('coupon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.coupon', unique=True)),
            ],
        ),
    ]
