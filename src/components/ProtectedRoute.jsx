import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const ProtectedRoute = ({ children, allowedRoles = []}) => {
  const { userId, userName, userRole, loading } = useAuth();
  const [Authorized, setAuthorized] = useState(null);
  useEffect(() => {
    if (!loading) {
      if (allowedRoles.includes(userRole)) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    }
  }, [userRole, allowedRoles, loading]);

  if (loading) {
    return <div>Cargando...</div>; // Mientras se valida el token
  }

  if (Authorized === false) {
    return <Navigate to={userRole != null ? "/" : "/login"} />; // Redirige si no tiene el rol adecuado
  }

  return Authorized ? children : null; // Renderiza el contenido si está autorizado
};

export { ProtectedRoute };
