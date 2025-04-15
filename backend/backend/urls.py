"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def index(request):
     return HttpResponse("""
        <h2>🎟️ Welcome to the Ticketing API</h2>
        <p>Visit the <a href='/api/tickets/' style='color:blue;'>Ticket Endpoint</a> to view or submit tickets.</p>
    """)
urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('api/', include('tickets.urls')),
     path('api-auth/', include('rest_framework.urls')),
]
