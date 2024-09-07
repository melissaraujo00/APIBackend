import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para verificar autenticación
  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:3000/login/status", {
        withCredentials: true,
      });
      switch (response.status) {
        case 200:
          setUserId(response.data.user.id);
          setUserName(response.data.user.username);

          switch (response.data.user.role[0]) {
            case "user":
              setUserRole(1);
              break;

            case "profesor":
              setUserRole(2);
              break;

            case "admin":
              setUserRole(3);
              break;
            default:
              setUserRole(1);
          }

          // setUserRole(response.data.user.role[0]);

          // console.log('response.data.user', response.data.user.id)
          // console.log('response.data.user.username:', response.data.user.username)
          // console.log('response.data.user.role:', response.data.user.role[0])
          break;
        case 401:
          alert("Acceso denegado");
          break;

        case 404:
          alert("Usuario no registrado");
          break;
      }
      // { userId, userName, userRole };
    } catch (error) {
      console.error("Token inválido o expirado:", error);
      // return null; // Si ocurre un error, consideramos que no está autenticado
    } finally {
      setLoading(false); // Termina la carga
    }
  };
  // Ejecutar la validación del token cuando se cargue la app
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, userName, userRole, loading ,checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}
