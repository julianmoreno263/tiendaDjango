from django.urls import path
from . import views

app_name = "carro"

urlpatterns = [

    path("agregar/<int:producto_id>/", views.agregarProducto, name="agregar"),
    path("eliminar/<int:producto_id>/", views.eliminarProducto, name="eliminar"),
    path("restar/<int:producto_id>/", views.restarProductos, name="restar"),
    path("limpiar/", views.limpiarCarrito, name="limpiar"),


]
