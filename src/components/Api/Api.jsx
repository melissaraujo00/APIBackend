import axios from "axios";

export const GetAllModules = async () => {
  try {
    const response = await axios.get("http://localhost:3000/modulo/", {
      withCredentials: true,
    });

    // if (response.status == 200) {

    // } else {
    //   console.log("Error");
    // }

    return response
  } catch (error) {
    return null;
  }
};
