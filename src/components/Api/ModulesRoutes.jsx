import axios from "axios";

export const GetAllModules = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/modulos/", {
      withCredentials: true,
    });

    return response
  } catch (error) {
    return null;
  }
};
