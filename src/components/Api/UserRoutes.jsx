import axios from "axios";

export const GetAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/login/usuario", {
      withCredentials: true,
    });

    return response
  } catch (error) {
    return null;
  }
};
export const DeleteOneUser = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/login/usuario/${id}`, {
      withCredentials: true,
    });

    return response
  } catch (error) {
    return null;
  }
};


export const getUserRoadmaps = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/login/roadmapUsuario",
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log("Error obtener la data", error);
    return null;
  }
};

export const getRoadmap = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/login/roadmapId/${id}`,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log("Error obtener la data", error);
    return null;
  }
};
export const getAllRoadmaps = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/login/listaRoadmap`,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log("Error obtener la data", error);
    return null;
  }
};
