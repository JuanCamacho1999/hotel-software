from django.contrib import admin
from django.contrib.auth.models import Group, Permission
from .models import Habitacion, Huesped, Reserva

class HabitacionAdmin(admin.ModelAdmin):
    search_fields = ['tipo_habitacion'] 

admin.site.register(Habitacion, HabitacionAdmin)
admin.site.register(Huesped)
admin.site.register(Reserva)

def setup_groups():
    # Crear grupos de usuarios
    recepcionista_group, _ = Group.objects.get_or_create(name='Recepcionista')
    cliente_group, _ = Group.objects.get_or_create(name='Cliente')
    
    # Permisos para los recepcionistas
    recepcionista_permissions = [
        'add_huesped',
        'change_reserva',
        'view_reserva',
        'view_habitacion',
    ]

    for perm in recepcionista_permissions:
        permission = Permission.objects.get(codename=perm)
        recepcionista_group.permissions.add(permission)

setup_groups()
