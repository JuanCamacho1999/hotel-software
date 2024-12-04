from django.http import JsonResponse
from django.contrib.auth.decorators import login_required, permission_required
from .models import Habitacion, Huesped, Reserva
import json

@login_required
@permission_required('app.view_habitacion', raise_exception=True)
def consultar_precio(request, tipo):
    if request.method == 'GET':
        habitaciones = Habitacion.objects.filter(tipo_habitacion=tipo)
        precios = habitaciones.values('numero_habitacion', 'precio')
        return JsonResponse(list(precios), safe=False)
    return JsonResponse({"success": False, "error": "Método no permitido"})

@login_required
@permission_required('app.add_huesped', raise_exception=True)
def registrar_huesped(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        huesped = Huesped.objects.create(
            nombre=data['nombre'],
            email=data['email'],
            telefono=data['telefono'],
            documento_identidad=data['documento_identidad'],
        )
        return JsonResponse({"success": True, "message": "Huésped registrado con éxito"})
    return JsonResponse({"success": False, "error": "Método no permitido"})

@login_required
@permission_required('app.add_reserva', raise_exception=True)
def realizar_reserva(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        huesped = Huesped.objects.get(id=data['huesped_id'])
        habitacion = Habitacion.objects.get(id=data['habitacion_id'])
        reserva = Reserva.objects.create(
            huesped=huesped,
            habitacion=habitacion,
            fecha_ingreso=data['fecha_ingreso'],
            fecha_salida=data['fecha_salida'],
            estado="Pendiente",
        )
        return JsonResponse({"success": True, "message": "Reserva realizada con éxito"})
    return JsonResponse({"success": False, "error": "Método no permitido"})

@login_required
@permission_required('app.change_reserva', raise_exception=True)
def modificar_reserva(request, reserva_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        reserva = Reserva.objects.get(id=reserva_id)
        reserva.fecha_ingreso = data['fecha_ingreso']
        reserva.fecha_salida = data['fecha_salida']
        reserva.estado = data['estado']
        reserva.save()
        return JsonResponse({"success": True, "message": "Reserva modificada con éxito"})
    return JsonResponse({"success": False, "error": "Método no permitido"})
