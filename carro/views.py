from django.shortcuts import render
from .carro import Carro
from tienda.models import Producto
from django.shortcuts import redirect


# Create your views here.

def agregarProducto(request, producto_id):
    carro = Carro(request)  # creamos el carro

    # obtener el producto que queremos agregar
    producto = Producto.objects.get(id=producto_id)

    # agregamos el producto al carro
    carro.agregar(producto=producto)
    return redirect("Tienda")


def eliminarProducto(request, producto_id):
    carro = Carro(request)
    producto = Producto.objects.get(id=producto_id)
    carro.eliminar(producto)(producto=producto)
    return redirect("Tienda")


def restarProductos(request, producto_id):
    carro = Carro(request)
    producto = Producto.objects.get(id=producto_id)
    carro.restarProducto(producto=producto)
    return redirect("Tienda")


def limpiarCarrito(request, producto_id):
    carro = Carro(request)
    carro.limpiarCarro()
    return redirect("Tienda")
