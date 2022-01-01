from django.contrib import admin

# Register your models here.
from .models import Home_page,Userbase

admin.site.register(Home_page)
admin.site.register(Userbase)