// src/components/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Bienvenido</h2>
      <button onClick={() => navigate("/admin")}>Admin Panel</button>
      <button onClick={() => navigate("/receptionist")}>Receptionist Panel</button>
      <button onClick={() => navigate("/client")}>Client Panel</button>
    </div>
  );
};

export default Dashboard;
