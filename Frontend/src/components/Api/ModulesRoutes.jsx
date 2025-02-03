import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;
export const GetAllModules = async () => {

  const response = await axios.get(apiURL + "/api/modulos/", {
    withCredentials: true,
  });

  return response;

};
export const GetUserModules = async () => {
  const response = await axios.get(apiURL + "/login/obtenerModuloUsuario/", {
    withCredentials: true,
  });

  return response;
};
export const GetOneModule = async (id) => {
  const response = await axios.get(apiURL + `/api/modulos/${id}`, {
    withCredentials: true,
  });

  return response;
};
export const DeleteOneModule = async (id) => {
  try {
    const response = await axios.delete(apiURL + `/api/modulos/${id}`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return null;
  }
};
export const SaveModule = async (moduleData) => {
  try {
    const response = await axios.post(apiURL + "/api/modulos/", moduleData, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return null;
  }
};
