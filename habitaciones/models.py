from django.db import models
from django.contrib.auth.models import User

class Habitacion(models.Model):
    numero_habitacion = models.IntegerField(unique=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=[('Disponible', 'Disponible'), ('Ocupada', 'Ocupada')])
    tipo_habitacion = models.CharField(max_length=50)

    def __str__(self):
        return f"Habitación {self.numero_habitacion} - {self.tipo_habitacion}"

class Huesped(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=15)
    documento_identidad = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Reserva(models.Model):
    huesped = models.ForeignKey(Huesped, on_delete=models.CASCADE)
    habitacion = models.ForeignKey(Habitacion, on_delete=models.CASCADE)
    fecha_ingreso = models.DateField()
    fecha_salida = models.DateField()
    estado = models.CharField(max_length=20, choices=[('Pendiente', 'Pendiente'), ('Confirmada', 'Confirmada')])

    def __str__(self):
        return f"Reserva de {self.huesped} en habitación {self.habitacion}"
