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
