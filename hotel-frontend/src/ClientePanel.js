import React, { useState, useEffect } from "react";
import axios from "axios";

const ClientPanel = () => {
    const [tiposHabitaciones, setTiposHabitaciones] = useState([]);
    const [precioHabitaciones, setPrecioHabitaciones] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/habitaciones/")
            .then(response => {
                const tipos = [...new Set(response.data.map(h => h.tipo_habitacion))];
                setTiposHabitaciones(tipos);
            })
            .catch(error => {
                console.error("Error al obtener tipos de habitaciones:", error);
            });
    }, []);

    const handleConsultarPrecio = (tipo) => {
        axios.get(`http://localhost:8000/api/habitaciones/precio/${tipo}`)
            .then(response => {
                setPrecioHabitaciones(response.data);
            })
            .catch(error => {
                console.error("Error al consultar precios:", error);
            });
    };

    return (
        <div>
            <h2>Panel de Cliente</h2>
            <h3>Consultar Precios de Habitaciones</h3>
            <select onChange={(e) => handleConsultarPrecio(e.target.value)}>
                <option value="">Seleccionar tipo de habitación</option>
                {tiposHabitaciones.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                ))}
            </select>

            <h4>Precios disponibles</h4>
            <ul>
                {precioHabitaciones.map(habitacion => (
                    <li key={habitacion.numero_habitacion}>
                        Habitación {habitacion.numero_habitacion} - ${habitacion.precio}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientPanel;
