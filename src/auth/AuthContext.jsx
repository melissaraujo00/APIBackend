import { createContext, useEffect, useState } from "react";
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
          setUserId(authData.data._id);
          setUserName(`${authData.data.name} ${authData.data.lastName}`);
          setUserEmail(authData.data.email);
          setUserRole(authData.data.roles[0]);
          break;
        case 401:
          console.log("401: ", "Acceso denegado");
          break;

        case 404:
          console.log("404: ", "Usuario no registrado");
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
    return 200;
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

export { AuthContext };
