from django.contrib import admin
from accounts.models import accounts

class accountAdmin(admin.ModelAdmin):
    list_display = ('username','email','password')
admin.site.register(accounts,accountAdmin)

