import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

export const GetAllUsers = async () => {
  try {
    const response = await axios.get(apiURL + "/login/usuario", {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return null;
  }
};
export const DeleteOneUser = async (id) => {
  try {
    const response = await axios.delete(apiURL + `/login/usuario/${id}`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return null;
  }
};

export const getUserRoadmaps = async () => {
  try {
    const response = await axios.get(apiURL + "/login/roadmapUsuario", {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log("Error obtener la data", error);
    return null;
  }
};

export const getRoadmap = async (id) => {
  try {
    const response = await axios.get(apiURL + `/login/roadmapId/${id}`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log("Error obtener la data", error);
    return null;
  }
};
export const getAllRoadmaps = async () => {
  try {
    const response = await axios.get(apiURL + "/login/listaRoadmap", {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log("Error obtener la data", error);
    return null;
  }
};
