# Generated by Django 3.1.5 on 2021-02-18 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='home_page',
            name='email',
        ),
        migrations.RemoveField(
            model_name='home_page',
            name='name',
        ),
        migrations.RemoveField(
            model_name='home_page',
            name='no',
        ),
        migrations.AddField(
            model_name='home_page',
            name='password',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='home_page',
            name='phone',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AddField(
            model_name='home_page',
            name='useremail',
            field=models.EmailField(default='', max_length=100),
        ),
    ]
