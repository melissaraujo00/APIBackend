// src/components/ProtectedRoute.jsx
// import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userId, userName, userRole, loading } = useAuth();
  console.log('requiredRole:', requiredRole)
  console.log('userRole:', userRole)
  // const [loading, setLoading] = useState(true);
  // const [isAuthorized, setIsAuthorized] = useState(false);

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     const { userId, userName, userRole } = await checkAuth(); // Verificar autenticación

  //     // Si hay usuario, verificar el rol
  //     if (userId) {
  //       if (requiredRole) {
  //         console.log("requiredRole:", requiredRole);
  //         console.log("userRole:", userRole);
  //         // Si se especifica un rol, verificar si el rol coincide
  //         if (userRole == requiredRole) {
  //           setIsAuthorized(true);
  //         } else {
  //           setIsAuthorized(false);
  //         }
  //       } else {
  //         // Si no se requiere un rol, permitir acceso
  //         setIsAuthorized(true);
  //       }
  //     } else {
  //       setIsAuthorized(false); // No autenticado
  //     }

  //     setLoading(false); // Finalizar el proceso de carga
  //   };

  //   verifyAuth();
  // }, [requiredRole, checkAuth]);

  if (loading) {
    return <div>Cargando...</div>; // Mientras se valida el token
  }

  if (requiredRole && userRole < requiredRole) {
    return <Navigate to="/notFount" />; // Redirige si no tiene el rol adecuado
  }

  return children; // Renderizar el contenido si está autorizado
};

export { ProtectedRoute };
