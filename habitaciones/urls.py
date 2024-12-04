from django.urls import path
from .views import consultar_precio, registrar_huesped, realizar_reserva, modificar_reserva

urlpatterns = [
    path('habitacion/consultar/<str:tipo>/', consultar_precio, name='consultar_precio'),
    path('huesped/registrar/', registrar_huesped, name='registrar_huesped'),
    path('reserva/realizar/', realizar_reserva, name='realizar_reserva'),
    path('reserva/modificar/<int:reserva_id>/', modificar_reserva, name='modificar_reserva'),
]
