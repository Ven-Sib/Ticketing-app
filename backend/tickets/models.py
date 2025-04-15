from django.db import models

class Ticket(models.Model):
    TICKET_TYPES = [('VIP', 'VIP'), ('Regular', 'Regular')]
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('processed', 'Processed'),
        ('cancelled', 'Cancelled')
    ]

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=TICKET_TYPES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.type} ({self.status})"
