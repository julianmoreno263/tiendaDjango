from email import message
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from carro.carro import Carro
from django.contrib import messages
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail

from pedidos.models import LineaPedido, Pedido

# Create your views here.


@login_required(login_url="/autenticacion/logear")
def procesar_pedido(request):
    pedido=Pedido.objects.create(user=request.user)
    carro=Carro(request)
    lineas_pedido=list()
    for key, value in carro.carro.items():
        lineas_pedido.append(LineaPedido(
            producto_id=key,
            cantidad=value['cantidad'],
            user=request.user,
            pedido=pedido                 
            ))

    LineaPedido.objects.bulk_create(lineas_pedido)

    enviarEmail(
        pedido=pedido,
        lineas_pedido=lineas_pedido,
        nombreusuario=request.user.username,
        email_usuario=request.user.email
        

    )

    messages.success(request,"El pedido se ha creado correctamente!")

    return redirect("../tienda")

def enviarEmail(**kwargs):
    asunto="Gracias por el pedido"
    mensaje=render_to_string("emails/pedido.html",{
        "pedido": kwargs.get("pedido"),
        "lineas_pedido": kwargs.get("lineas_pedido"),
        "nomUsuario": kwargs.get("nomUsuario"),

    })

    mensajeTexto=strip_tags(mensaje)
    fromEmail="julianmoreno263@gmail.com"
    # to=kwargs.get("emailusuario")
    to="julianmoreno263@gmail.com"#correo para la prueba,para no ponernos a registrar un usuario con un correo

    send_mail(asunto, mensajeTexto, fromEmail,[to],html_message=mensaje)

