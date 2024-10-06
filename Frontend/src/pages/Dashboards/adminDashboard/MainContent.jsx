import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import {
  Users,
  Plus,
  Trash2,
  SquareArrowOutUpRight,
  BookOpen,
} from "lucide-react";
import ModalConfirmation from "./ModalConfirmation";
import {
  DeleteOneModule,
  GetAllModules,
  GetUserModules,
} from "../../../components/Api/ModulesRoutes";
import { useAuth } from "../../../auth/useAuth";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { GetAllUsers } from "../../../components/Api/UserRoutes";

export default function MainContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [courseDeleting, setCourseDeleting] = useState();
  const [stats, setStats] = useState([]);
  const [isLoading, setisLoading] = useState("LOADING"); // LOADING SUCCESSFUL ERROR
  const [courses, setCourses] = useState([]);
  const { userRole } = useAuth();

  useEffect(() => {
    setStats([]);
    const GetData = async () => {
      // Cantidad de usuarios
      const usersResponse = await GetAllUsers();
      if (usersResponse.status == 200) {
        const usersLength = usersResponse.data.length;
        setStats((prev) => [
          ...prev,
          {
            name: "Usuarios Totales",
            value: usersLength,
            icon: Users,
          },
        ]);
      }

      // OBTENIENDO MODULOS
      if (userRole == "profesor") {
        // DEL USUARIO PROFESOR
        try {
          const coursesUsersResponse = await GetUserModules();

          if (coursesUsersResponse.status == 200) {
            const coursesdata = coursesUsersResponse.data;
            setCourses(coursesdata.reverse());
          }
        } catch (error) {
          console.log("errorGetUserModules: ", error);
        }
      } else {
        //TODOS LOS MODULOS
        try {
          const coursesResponse = await GetAllModules();
          if (coursesResponse.status == 200) {
            const coursesdata = coursesResponse.data;
            setCourses(coursesdata.reverse());

            let modulesCount = 0;
            for (let i = 0; i < coursesResponse.data.length; i++) {
              modulesCount += coursesResponse.data[i].temas.length;
            }
            setStats((prev) => [
              ...prev,
              {
                name: "Cursos Totales",
                value: modulesCount,
                icon: BookOpen,
              },
            ]);
          }
        } catch (error) {
          console.log("error", error);
        }
      }

      setisLoading("SUCCESSFUL");
      console.log(courses);
    };
    GetData();
  }, []);

  const deleteCourse = (dataCourse) => {
    setCourseDeleting(dataCourse);
    setIsOpen(true);
  };
  const routesList = [
    { ruta: "/" },
    { ruta: "/admin" },
    { ruta: "/login" },
    { ruta: "/signup" },
    { ruta: "/dashboard" },
    { ruta: "/courses" },
    { ruta: "/roadmap" },
    { ruta: "/RoadmapCreator" },
    { ruta: "/NotFoundPage" },
  ];

  return (
    <>
      {isOpen == true && (
        <ModalConfirmation
          title={"Confimar eliminacion del curso"}
          body={
            <>
              <p className="text-lg">id: {courseDeleting._id}</p>
              <p className="text-ls">Nombre: {courseDeleting.titulo}</p>
            </>
          }
          isOpen={setIsOpen}
          execFunction={DeleteOneModule}
          idItem={courseDeleting._id}
        />
      )}
      {isLoading == "LOADING" ? (
        <LoadingScreen  />
      ) : isLoading == "SUCCESSFUL" ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((item) => (
              <div
                key={item.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <item.icon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {item.name}
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {item.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className=" gap-7 ">
            <div className="bg-white shadow rounded-lg w-full">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Gestión de Cursos
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre del Curso
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lecciones
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((course, index) => (
                      <tr key={course._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {course.titulo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                          {course.temas.length}
                        </td>
                        <td className="flex px-6 py-4 whitespace-nowrap text-sm font-medium ">
                          <button
                            onClick={() => deleteCourse(course)}
                            className="text-red-600 hover:text-red-900 mr-5"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                          <Link
                            to={`/viewcourse/${course._id}`}
                            className="text-indigo-600 hover:text-indigo-900 "
                          >
                            <SquareArrowOutUpRight className="h-5 w-5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg w-5/12">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Acciones Rápidas
                </h2>
                <div className="space-y-4">
                  <Link
                    to={"/newcourse"}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="mr-2 h-5 w-4" aria-hidden="true" />
                    Crear Nuevo Curso
                  </Link>
                  <button
                    onClick={() => {
                      setActiveTab("USERS");
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
                  >
                    <Users className="mr-2 h-5 w-4" aria-hidden="true" />
                    Gestionar Usuarios
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-white shadow rounded-lg">
            {userRole == "admin" && (
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Site routes
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Site routes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {routesList.map((ruta, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <Link to={ruta.ruta}>{ruta.ruta}</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <ErrorMessage />
      )}
    </>
  );
}
