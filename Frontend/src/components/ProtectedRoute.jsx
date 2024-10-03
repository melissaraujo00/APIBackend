import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { LoadingScreen } from "./LoadingScreen";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
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
    return <LoadingScreen className={"flex items-center justify-center h-screen"} textLoading={'Por favor espere...'} />; // Mientras se valida el token
  }

  if (Authorized === false) {
    return <Navigate to={userRole != null ? "/" : "/login"} />; // Redirige si no tiene el rol adecuado
  }

  return Authorized ? children : null; // Renderiza el contenido si está autorizado
};

export { ProtectedRoute };
