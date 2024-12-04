import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [newHabitacion, setNewHabitacion] = useState({
        numero_habitacion: "",
        precio: "",
        tipo_habitacion: "",
        estado: "Disponible"
    });

    // Obtener las habitaciones desde el backend
    useEffect(() => {
        axios.get("http://localhost:8000/api/habitaciones/")
            .then(response => {
                setHabitaciones(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener las habitaciones:", error);
            });
    }, []);

    // Función para manejar la creación de nuevas habitaciones
    const handleCreateHabitacion = () => {
        axios.post("http://localhost:8000/api/habitaciones/", newHabitacion)
            .then(response => {
                setHabitaciones([...habitaciones, response.data]);
                setNewHabitacion({
                    numero_habitacion: "",
                    precio: "",
                    tipo_habitacion: "",
                    estado: "Disponible"
                });
            })
            .catch(error => {
                console.error("Hubo un error al crear la habitación:", error);
            });
    };

    return (
        <div>
            <h2>Panel de Administración</h2>
            <h3>Gestionar Habitaciones</h3>
            <div>
                <h4>Agregar Nueva Habitación</h4>
                <input
                    type="text"
                    placeholder="Número de habitación"
                    value={newHabitacion.numero_habitacion}
                    onChange={(e) => setNewHabitacion({ ...newHabitacion, numero_habitacion: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={newHabitacion.precio}
                    onChange={(e) => setNewHabitacion({ ...newHabitacion, precio: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Tipo de habitación"
                    value={newHabitacion.tipo_habitacion}
                    onChange={(e) => setNewHabitacion({ ...newHabitacion, tipo_habitacion: e.target.value })}
                />
                <select
                    value={newHabitacion.estado}
                    onChange={(e) => setNewHabitacion({ ...newHabitacion, estado: e.target.value })}
                >
                    <option value="Disponible">Disponible</option>
                    <option value="Ocupada">Ocupada</option>
                </select>
                <button onClick={handleCreateHabitacion}>Crear Habitación</button>
            </div>

            <h3>Lista de Habitaciones</h3>
            <ul>
                {habitaciones.map(habitacion => (
                    <li key={habitacion.numero_habitacion}>
                        Habitación {habitacion.numero_habitacion} - {habitacion.tipo_habitacion} 
                        - {habitacion.estado} - ${habitacion.precio}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
