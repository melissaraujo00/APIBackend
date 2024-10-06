import React, { useState } from "react";
import { X } from "lucide-react";
import { UpdateOneUser, UpdateUser } from "./Api/UserRoutes";

import { Slide, ToastContainer, toast } from "react-toastify";
import { useAuth } from "../auth/useAuth";

const EditUser = ({ userData, setIsEditModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { userRole , checkAuthentication } = useAuth();

  const validationData = (e) => {
    let firsToast = 0;

    const Alerta = (inputRequired) => {
      firsToast += 1;
      if (firsToast == 1) {
        toast("Completa todos los campos.", {
          type: "warning",
          icon: "🔴",
          position: "top-right",
          autoClose: 10000,
          pauseOnHover: false,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      }

      toast(`Completa el campo: ${inputRequired}`, {
        type: "warning",
        icon: "🔴",
        position: "top-right",
        autoClose: 10000,
        pauseOnHover: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    };

    if (e.target.name.value == "") {
      Alerta("Nombre");
    }
    if (e.target.lastName.value == "") {
      Alerta("Apellido");
    }

    if (userRole == "admin") {
      if (e.target.email.value === "") {
        Alerta("Email");
      }
    }

    return firsToast == 0 ? true : false;
  };

  const UpdateUserSubmit = async (e) => {
    e.preventDefault();

    if (!isLoading) {
      const validate = validationData(e);
      if (validate === true) {
        setIsLoading(true);
        toast.dismiss();
        const toastId = toast.loading("Publicando...");

        const fetchValidation = (id, userData) => {
          // Check if the user is an admin
          if (userRole === "admin") {
            // If admin, update a specific user using UpdateUser
            return UpdateUser(id, userData);
          } else {
            // Otherwise, update the logged-in user's information
            return UpdateOneUser(userData);
          }
        };
        const roleValidation = () => {
          let role = userData.roles[0];
          if (userRole == "admin") {
            role = e.target.role.value;
          }

          return role;
        };
        const emailValidation = () => {
          let email = userData.email;
          if (userRole == "admin") {
            email = e.target.email.value;
          }

          return email;
        };

        let dataUser = {
          name: e.target.name.value,
          lastName: e.target.lastName.value,
          user: `${e.target.name.value} ${e.target.lastName.value}`,
          email: emailValidation(),
          roles: roleValidation(),
        };
        try {
          const updateResponse = await fetchValidation(userData._id, dataUser);
          console.log("updateResponse", updateResponse);

          if (updateResponse.status == 200) {
            toast.update(toastId, {
              render: "Datos actualizados correctamente!",
              type: "success",
              isLoading: false,
              icon: "🟢",
              autoClose: 3000,
              pauseOnHover: false,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1300);
          } else {
            toast.update(toastId, {
              render: "Error desconocido, intentelo de nuevo",
              type: "error",
              isLoading: false,
              icon: "🔴",
              autoClose: 4000,
              pauseOnHover: false,
            });
            setIsLoading(false);
          }
        } catch (error) {
          toast.update(toastId, {
            render: "Error desconocido, intentelo de nuevo",
            type: "error",
            isLoading: false,
            icon: "🔴",
            autoClose: 4000,
            pauseOnHover: false,
          });
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <ToastContainer closeOnClick={true} />
      <div className="fixed inset-0  flex items-center justify-center p-4  bg-gray-900 bg-opacity-75 z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Editar Perfil</h3>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={UpdateUserSubmit} className="space-y-4 ">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={userData.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={userData.lastName}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            {userRole == "admin" && (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={userData.email}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rol
                  </label>
                  <select
                    id="role"
                    name="role"
                    defaultValue={userData.roles[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    {/* ['user', 'admin', 'profesor'] */}
                    <option>user</option>
                    <option>profesor</option>
                    <option>admin</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className={
                  isLoading
                    ? "bg-gray-600 cursor-not-allowed  text-white px-4 py-2 rounded-md transition duration-300"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300"
                }
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
