from django.urls import path
from .views import VRegistro,cerrarSesion,logear


urlpatterns = [

    path("", VRegistro.as_view(), name="Autenticacion"),
    path("cerrarSesion", cerrarSesion, name="cerrarSesion"),
    path("logear", logear, name="logear"),



]
