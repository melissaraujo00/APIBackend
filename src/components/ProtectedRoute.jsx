// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, role, requiredRole, children }) => {
    console.log('user', user)
  

  if (!user) {
    // Si no hay usuario, redirigir al login
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    // Si el usuario no tiene el rol requerido, mostrar error o redirigir
    return <Navigate to="/NotFoundPage" />;
  }

  // Si todo está bien, renderizar el contenido
  return children;
};

export { ProtectedRoute };
