// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [userId, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/login/status", {
          withCredentials: true,
        });

        switch (response.status) {
          case 200:
            setUser(response.data.user.username);
            setRole(response.data.user.role[0]);
            setId(response.data.user.id);

            // console.log('response.data.user', response.data.user.id)
            // console.log('response.data.user.username:', response.data.user.username)
            // console.log('response.data.user.role:', response.data.user.role[0])
            break;
          case 401:
            alert("Acceso denegado");
            break;

          case 404:
            alert("Usuario no registrado");
            break;

          case 500:
            alert("Error al obtener el usuario");
        }
      } catch (error) {
        // console.error("Error checking auth: ", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { userId, user, role, loading };
};

export { useAuth };
