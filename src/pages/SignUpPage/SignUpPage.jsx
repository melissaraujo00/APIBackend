import { React, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { signUpUser } from "../../auth/authService";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userType, setUserType] = useState("student");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación simple
    if (!name || !password || !lastName) {
      toast("Por favor, complete todos los campos", {
        type: "warning",
        icon: "🔴",
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }

    if (password != confirmPassword) {
      toast("Las contraseñas no son iguales", {
        type: "warning",
        icon: "🔴",
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });

      return;
    }

    toast.dismiss();
    const toastId = toast.loading("Registrando...");

    try {
      let userData = {
        name: name,
        lastName: lastName,
        user: name,
        email: email,
        password: password,
        roles: "user",
      };

      if (userType == "teacher") {
        userData.roles = "profesor";
      }

      const signUpResponse = await signUpUser(userData);

      if (signUpResponse.status == 200) {
        //Registro exitoso
        toast.update(toastId, {
          render: `${signUpResponse.data.msg}`,
          type: "success",
          isLoading: false,
          icon: "🟢",
          autoClose: 3000,
          pauseOnHover: false,
        });

        setTimeout(() => {
          navigate("/login"); // Redirigir al login
        }, 1000);
      } else {
        //Si ocurre algun resultado inesperado
        toast.update(toastId, {
          render: "Error desconocido, intentelo de nuevo",
          type: "error",
          isLoading: false,
          icon: "🔴",
          autoClose: 4000,
          pauseOnHover: false,
        });
      }
    } catch (error) {
      toast.dismiss(toastId);

      //Mostrar el error que ocurrio
      if (error.response) {
        //Si los datos no son validos
        if (error.status == 422) {
          const errors = error.response.data.errors;
          for (let i = 0; i < errors.length; i++) {
            toast(errors[i].msg, {
              type: "error",
              isLoading: false,
              icon: "🔴",
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            });
          }
        }
        //Si el usuario ya existe
        if (error.status == 400) {
          toast(`Error: ${error.response.data.msg}`, {
            type: "error",
            isLoading: false,
            icon: "🔴",
            position: "top-right",
            autoClose: 4000,
            pauseOnHover: false,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        }
      } else {
        //Si ocurrio cualquier otro error
        toast(`${error.message}: Error en el servidor, intentelo más tarde`, {
          type: "error",
          isLoading: false,
          icon: "🔴",
          position: "top-right",
          autoClose: 4000,
          pauseOnHover: false,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer closeOnClick={true} />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <span className="sr-only">FutureCode</span>
          <svg
            className="h-12 w-auto text-indigo-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </Link>
        <h2
          onClick={() => {
            noti();
          }}
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
        >
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          O
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            inicie sesión en su cuenta existente
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
                  placeholder="John Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Dirección de correo electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
                  placeholder="pepito@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md h-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md h-10"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="user-type"
                className="block text-sm font-medium text-gray-700"
              >
                Soy un:
              </label>
              <div className="mt-2 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                <div className="flex items-center">
                  <input
                    id="user-type-student"
                    name="user-type"
                    type="radio"
                    checked={userType === "student"}
                    onChange={() => setUserType("student")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="user-type-student"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    <span className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-gray-400" />
                      Estudiante
                    </span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="user-type-teacher"
                    name="user-type"
                    type="radio"
                    checked={userType === "teacher"}
                    onChange={() => setUserType("teacher")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="user-type-teacher"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    <span className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                      Maestro
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
