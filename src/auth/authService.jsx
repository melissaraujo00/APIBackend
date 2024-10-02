import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

// Verificar el estado de autenticación de usuario
export const checkAuth = async () => {
  try {
    const response = await axios.get(apiURL + "/login/profile", {
      withCredentials: true,
    });
    return response; // Devuelve los datos del usuario si está autenticado
  } catch (error) {
    return null;
  }
};

// Realizar el cierre de sesion
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      apiURL + "/login/logout",
      {},
      {
        withCredentials: true, // Asegura que las cookies se envíen
      }
    );

    return response; // Devuelve true si el logout fue exitoso
  } catch (error) {
    console.error("Error al hacer logout", error);
    return false;
  }
};

// Realizar el inicio de sesion
export const loginUser = async (email, password) => {
  try {
    const userData = {
      email: email,
      password: password,
    };
    const response = await axios.post(apiURL + "/login/signin", userData, {
      withCredentials: true, // Asegura que las cookies se envíen
    });
    return response;
  } catch (error) {
    throw error; // Re-lanza el error para que el componente lo maneje
  }
};

// Realizar el registro de usuaroi
export const signUpUser = async (userData) => {
  try {
    const response = await axios.post(apiURL + "/login/register", userData, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return null;
  }
};
