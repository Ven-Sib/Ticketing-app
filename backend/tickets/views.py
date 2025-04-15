from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.core.mail import EmailMessage
from .models import Ticket
from .serializers import TicketSerializer
import json

# ✅ List and Create Tickets
class TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

# ✅ Ticket Stats (adjusted to use status)
class TicketStatsView(APIView):
    def get(self, request):
        # Static totals
        VIP_TOTAL = 20
        REGULAR_TOTAL = 40

        vip_active = Ticket.objects.filter(type='VIP', status='active').count()
        vip_cancelled = Ticket.objects.filter(type='VIP', status='cancelled').count()
        vip_available = VIP_TOTAL - vip_active  # ✅ NOT just cancelled

        regular_active = Ticket.objects.filter(type='Regular', status='active').count()
        regular_cancelled = Ticket.objects.filter(type='Regular', status='cancelled').count()
        regular_available = REGULAR_TOTAL - regular_active  # ✅ same here

        return Response({
            "VIP_active": vip_active,
            "VIP_cancelled": vip_cancelled,
            "VIP_total": VIP_TOTAL,
            "VIP_available": vip_available,

            "Regular_active": regular_active,
            "Regular_cancelled": regular_cancelled,
            "Regular_total": REGULAR_TOTAL,
            "Regular_available": regular_available,

            "Total_sold": vip_active + regular_active
        })



# ✅ Cancel Ticket Endpoint
@method_decorator(csrf_exempt, name='dispatch')
class CancelTicketView(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            name = data.get("name")
            ttype = data.get("type")
            ticket = Ticket.objects.filter(name=name, type=ttype, status='active').latest('timestamp')
            ticket.status = 'cancelled'
            ticket.save()
            return JsonResponse({"message": "Ticket cancelled."})
        except Ticket.DoesNotExist:
            return JsonResponse({"error": "Ticket not found."}, status=404)

# ✅ Mark Ticket as Processed
@method_decorator(csrf_exempt, name='dispatch')
class MarkProcessedView(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            name = data.get("name")
            ttype = data.get("type")
            ticket = Ticket.objects.filter(name=name, type=ttype, status='active').latest('timestamp')
            ticket.status = 'processed'
            ticket.save()
            return JsonResponse({"message": "Ticket marked as processed."})
        except Ticket.DoesNotExist:
            return JsonResponse({"error": "Ticket not found."}, status=404)

# ✅ List Tickets by Status
class TicketByStatusView(APIView):
    def get(self, request, status):
        if status not in ['active', 'processed', 'cancelled']:
            return JsonResponse({'error': 'Invalid status'}, status=400)

        tickets = Ticket.objects.filter(status=status).order_by('-timestamp')
        data = [{
            "name": t.name,
            "type": t.type,
            "status": t.status,
            "timestamp": t.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        } for t in tickets]
        return JsonResponse(data, safe=False)

# ✅ Admin Login
@method_decorator(csrf_exempt, name='dispatch')
class CustomLoginView(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except:
            return JsonResponse({'error': 'Invalid data'}, status=400)

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=403)

# ✅ Admin Logout
@method_decorator(csrf_exempt, name='dispatch')
class CustomLogoutView(APIView):
    def post(self, request):
        logout(request)
        return JsonResponse({'message': 'Logged out'}, status=200)

# ✅ Send PDF Receipt
@method_decorator(csrf_exempt, name='dispatch')
class SendReceiptEmailView(APIView):
    def post(self, request):
        pdf = request.FILES.get('pdf')
        name = request.POST.get('name')
        recipient = request.POST.get('email') or 'sibandavensen@gmail.com'

        if not pdf or not name:
            return JsonResponse({'error': 'Missing PDF or name'}, status=400)

        subject = f"🎟️ Ticket Receipt for {name}"
        body = f"Hello {name},\n\nAttached is your ticket receipt. Thank you!"

        email = EmailMessage(
            subject=subject,
            body=body,
            to=[recipient]
        )
        email.attach(pdf.name, pdf.read(), 'application/pdf')
        email.send()

        return JsonResponse({'message': 'Receipt sent successfully ✅'})
