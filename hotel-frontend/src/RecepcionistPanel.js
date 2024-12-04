import React, { useState, useEffect } from "react";
import axios from "axios";

const ReceptionistPanel = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [huespedes, setHuespedes] = useState([]);
    const [reserva, setReserva] = useState({
        huesped_id: "",
        habitacion_id: "",
        fecha_ingreso: "",
        fecha_salida: ""
    });

    useEffect(() => {
        axios.get("http://localhost:8000/api/habitaciones/")
            .then(response => {
                setHabitaciones(response.data);
            })
            .catch(error => {
                console.error("Error al obtener habitaciones:", error);
            });
        
        axios.get("http://localhost:8000/api/huespedes/")
            .then(response => {
                setHuespedes(response.data);
            })
            .catch(error => {
                console.error("Error al obtener huéspedes:", error);
            });
    }, []);

    const handleCreateReserva = () => {
        axios.post("http://localhost:8000/api/reservas/", reserva)
            .then(response => {
                alert("Reserva realizada con éxito");
            })
            .catch(error => {
                console.error("Error al hacer la reserva:", error);
            });
    };

    return (
        <div>
            <h2>Panel de Recepcionista</h2>
            <h3>Registrar Nueva Reserva</h3>
            <select
                value={reserva.huesped_id}
                onChange={(e) => setReserva({ ...reserva, huesped_id: e.target.value })}
            >
                <option value="">Seleccionar Huésped</option>
                {huespedes.map(huesped => (
                    <option key={huesped.id} value={huesped.id}>{huesped.nombre}</option>
                ))}
            </select>
            <select
                value={reserva.habitacion_id}
                onChange={(e) => setReserva({ ...reserva, habitacion_id: e.target.value })}
            >
                <option value="">Seleccionar Habitación</option>
                {habitaciones.map(habitacion => (
                    <option key={habitacion.id} value={habitacion.id}>{habitacion.numero_habitacion}</option>
                ))}
            </select>
            <input
                type="date"
                value={reserva.fecha_ingreso}
                onChange={(e) => setReserva({ ...reserva, fecha_ingreso: e.target.value })}
            />
            <input
                type="date"
                value={reserva.fecha_salida}
                onChange={(e) => setReserva({ ...reserva, fecha_salida: e.target.value })}
            />
            <button onClick={handleCreateReserva}>Crear Reserva</button>
        </div>
    );
};

export default ReceptionistPanel;
