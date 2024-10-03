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
