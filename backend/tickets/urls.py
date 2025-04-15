from django.urls import path
from .views import (
    TicketListCreateView,
    TicketStatsView,
    CustomLoginView,
    CustomLogoutView,
    SendReceiptEmailView,
    CancelTicketView,
    MarkProcessedView,
    TicketByStatusView,
)

urlpatterns = [
    path('tickets/', TicketListCreateView.as_view(), name='ticket-list'),
    path('stats/', TicketStatsView.as_view(), name='ticket-stats'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
    path('send-receipt/', SendReceiptEmailView.as_view(), name='send-receipt'),

    # ✅ NEW
    path('tickets/cancel/', CancelTicketView.as_view(), name='cancel-ticket'),
    path('tickets/mark_processed/', MarkProcessedView.as_view(), name='mark-processed'),
    path('tickets/status/<str:status>/', TicketByStatusView.as_view(), name='tickets-by-status'),
]
