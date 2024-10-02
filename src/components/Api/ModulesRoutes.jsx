import axios from "axios";

export const GetAllModules = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/modulos/", {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return null;
  }
};
export const GetOneModule = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/modulos/${id}`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return null;
  }
};
export const DeleteOneModule = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/modulos/${id}`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return null;
  }
};
export const SaveModule = async (moduleData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/modulos/",
      moduleData,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    return null;
  }
};
