import axios from "axios";

// Verificar el estado de autenticación
export const checkAuth = async () => {
  try {
    const response = await axios.get("http://localhost:3000/login/profile", {
      withCredentials: true, // Asegura que las cookies de autenticación se envíen
    });
    return response; // Devuelve los datos del usuario si está autenticado
  } catch (error) {
    // console.error("Error al verificar la autenticación\n", error.response.status);
    return null; // Si hay un error, devolvemos null para indicar que no está autenticado
  }
};

// Realizar el logout
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/login/logout",
      {},
      {
        withCredentials: true, // Asegura que las cookies se envíen
      }
    );

    return response; // Devuelve true si el logout fue exitoso
  } catch (error) {
    console.error("Error al hacer logout", error);
    return false; // Devuelve false si hubo un error en el logout
  }
};

// Realizar el login
export const loginUser = async (email, password) => {
  try {
    const userData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:3000/login/signin",
      userData,
      {
        withCredentials: true, // Asegura que las cookies se envíen
      }
    );
    return response;
  } catch (error) {
    throw error; // Re-lanza el error para que el componente lo maneje
  }
};
