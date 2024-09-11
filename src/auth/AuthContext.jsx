import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth, logoutUser } from "./authService"; // Importamos desde el servicio

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para verificar autenticación
  const checkAuthentication = async () => {
    const authData = await checkAuth();
    if (authData) {
      switch (authData.status) {
        case 200:
          setUserId(authData.data.user.id);
          setUserName(authData.data.user.username);
          setUserEmail(authData.data.user.useremail);
          setUserRole(authData.data.user.role[0]);
          // switch (authData.data.user.role[0]) {
          //   case "user":
          //     setUserRole(1);
          //     break;

          //   case "profesor":
          //     setUserRole(2);
          //     break;

          //   case "admin":
          //     setUserRole(3);
          //     break;
          //   default:
          //     setUserRole(1);
          // }
          break;
        case 401:
          console.log("401: ", "Acceso denegado");
          //   alert("Acceso denegado");
          break;

        case 404:
          console.log("404: ", "Usuario no registrado");
          // alert("Usuario no registrado");
          break;
      }
    } else {
      // Si ocurre un error, se asume que el usuario no está autenticado
      setUserId(null);
      setUserName(null);
      setUserEmail(null);
      setUserRole(null);
      console.error("Token inválido o expirado:");
    }
    setLoading(false); // Termina la carga
    return 200
  };

  // Función para hacer logout
  const logout = async () => {
    const logoutSuccess = await logoutUser(); // Llamamos al servicio de logout

    if (logoutSuccess) {
      switch (logoutSuccess.status) {
        case 200:
          setUserId(null);
          setUserName(null);
          setUserEmail(null);
          setUserRole(null);
          break;
      }
    }
  };

  // Ejecutar la validación del token cuando se cargue la app
  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        userName,
        userEmail,
        userRole,
        loading,
        checkAuthentication,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
// export function useAuth() {
//   return useContext(AuthContext);
// }
export { AuthContext };
