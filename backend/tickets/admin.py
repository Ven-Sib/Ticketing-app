from django.contrib import admin
from .models import Ticket

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'status', 'timestamp')
    list_filter = ('status', 'type')
