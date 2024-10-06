import { useState, useEffect } from "react";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { loginUser } from "../../auth/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { checkAuthentication } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading == false) {
      if (!email || !password) {
        alert("Por favor, complete todos los campos");
        return;
      }
      setIsLoading(true);
      const toastId = toast.loading("Iniciando sesion...");

      try {
        const loginPromise = await loginUser(email, password);

        if (loginPromise.status == 200) {
          //Inicio session exitoso
          toast.update(toastId, {
            render: `${loginPromise.data.message}, Por favor espere`,
            type: "success",
            isLoading: false,
            icon: "🟢",
            autoClose: 3500,
            pauseOnHover: false,
          });

          setTimeout(async () => {
            await checkAuthentication();
          }, 1000);
        } else {
          //Error desconocido
          toast.update(toastId, {
            render: "Error desconocido",
            type: "error",
            isLoading: false,
            icon: "🔴",
            autoClose: 3500,
            pauseOnHover: false,
          });
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          //Mostrar el error que ocurrio
          toast.update(toastId, {
            render: error.response.data.message,
            type: "error",
            isLoading: false,
            icon: "🔴",
            autoClose: 4000,
            pauseOnHover: false,
          });
        } else {
          //Si no hay conexion a al server
          toast.update(toastId, {
            render: (
              <span>
                {" "}
                {error.message} <br /> Error en el servidor, intentelo más tarde{" "}
              </span>
            ),
            type: "error",
            isLoading: false,
            icon: "🔴",
            autoClose: 4000,
            pauseOnHover: false,
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <a href="/" className="flex justify-center">
          <span className="sr-only">FutureCode</span>
          <svg
            className="h-12 w-auto text-indigo-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </a>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          O{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            crear una nueva cuenta
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 m-3 shadow rounded-lg sm:mx-10">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
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
                  autoComplete="current-password"
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
              <button
                type="submit"
                className={` ${
                  isLoading == false
                    ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                    : "bg-gray-400 cursor-not-allowed "
                } w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white `}
              >
                Iniciar sesion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
