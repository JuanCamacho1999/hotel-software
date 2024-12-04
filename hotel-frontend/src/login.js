// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Aquí es donde haces la petición a tu backend para autenticar
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });

      // Al recibir la respuesta, rediriges según el rol del usuario
      if (response.data.role === "admin") {
        navigate("/admin");
      } else if (response.data.role === "receptionist") {
        navigate("/receptionist");
      } else {
        navigate("/client");
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
