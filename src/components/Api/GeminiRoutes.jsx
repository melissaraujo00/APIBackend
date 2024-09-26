import axios from "axios";

export const MakeRoadmap = async (userQuestionnaire) => {
  try {
    const res = await axios.post("http://localhost:3000/gemini", {
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
      "http://localhost:3000/login/asignarRoadmap",
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
