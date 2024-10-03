import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

export const MakeRoadmap = async (userQuestionnaire) => {
  try {
    const res = await axios.post(`${apiURL}/gemini`, {
      userQuestionnaire,
    });

    return res;
  } catch (error) {
    console.log("Error al generar el roadmap: ", error);
    return null;
  }
};

export const SaveRoadmap = async (roadmap) => {
  try {
    const response = await axios.post(
      `${apiURL}/login/asignarRoadmap`,
      roadmap,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log("Error al guardar el roadmap", error);
    return null;
  }
};
export const DeleteRoadmap = async (id) => {
  const response = await axios.delete(`${apiURL}/login/Roadmap/${id}`, {
    withCredentials: true,
  });

  return response;
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
