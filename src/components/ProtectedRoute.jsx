// src/components/ProtectedRoute.jsx
// import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userId, userName, userRole, loading } = useAuth();
  console.log('requiredRole:', requiredRole)
  console.log('userRole:', userRole)

  if (loading) {
    return <div>Cargando...</div>; // Mientras se valida el token
  }

  if (requiredRole && userRole < requiredRole) {
    return <Navigate to="/notFount" />; // Redirige si no tiene el rol adecuado
  }

  return children; // Renderizar el contenido si está autorizado
};

export { ProtectedRoute };
