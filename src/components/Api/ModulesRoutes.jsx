import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

export const GetAllModules = async () => {
  try {
    const response = await axios.get(apiURL + "/api/modulos/", {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return null;
  }
};
export const GetOneModule = async (id) => {
  try {
    const response = await axios.get(apiURL + `/api/modulos/${id}`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return null;
  }
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
