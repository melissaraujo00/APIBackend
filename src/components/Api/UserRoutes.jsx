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
