import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Plus, Trash2, SquareArrowOutUpRight } from "lucide-react";
import ModalConfirmation from "./ModalConfirmation";
import { DeleteOneModule } from "../../../components/Api/ModulesRoutes";

export default function MainContent({
  userRole,
  stats,
  routesList,
  coursesModules,
  setActiveTab,
}) {
  const [coursesInfo, setCoursesInfo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [courseDeleting, setCourseDeleting] = useState();

  const deleteCourse = (dataCourse) => {
    setCourseDeleting(dataCourse);
    setIsOpen(true);
  };

  useEffect(() => {
    const data = async () => {
      const newCoursesInfo = [];

      for (let i = 0; i < coursesModules.length; i++) {
        const modulesCount = coursesModules[i].temas.length;
        newCoursesInfo.push({
          id: coursesModules[i]._id,
          name: coursesModules[i].titulo,
          modules: modulesCount,
        });
      }
      setCoursesInfo(newCoursesInfo);
    };

    data();
  }, []);


  return (
    <>
      {isOpen == true && (
        <ModalConfirmation
          title={"Confimar eliminacion del curso"}
          body={
            <>
              <p className="text-lg">id: {courseDeleting.id}</p>
              <p className="text-ls">Nombre: {courseDeleting.name}</p>

            </>
          }
          isOpen={setIsOpen}
          execFunction={DeleteOneModule}
          idItem={courseDeleting.id}
        />
      )}
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

      <div className="flex justify-between gap-7">
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
                {coursesInfo.map((course, index) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {course.modules}
                    </td>
                    <td className="flex px-6 py-4 whitespace-nowrap text-sm font-medium ">
                      <button
                        onClick={() => deleteCourse(course)}
                        className="text-red-600 hover:text-red-900 mr-5"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <Link
                        to={`/viewcourse/${course.id}`}
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
        {userRole == "admin" &&
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
        }

      </div>
    </>
  );
}
