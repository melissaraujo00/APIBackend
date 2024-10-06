import { useState, useEffect } from "react";
import {
  User,
  Edit,
  Zap,
  BookOpen,
  GraduationCap,
  ChevronDown,
  Settings,
  LogOut,
  Bell,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useAuth } from "../../../auth/useAuth";
import {
  DeleteRoadmap,
  getUserRoadmaps,
} from "../../../components/Api/RoadmapRoutes";
import ColorsIcons from "../../../components/ColorsIcons";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { ErrorMessage } from "../../../components/ErrorMessage";
import ModalConfirmation from "../adminDashboard/ModalConfirmation";
import EditUser from "../../../components/EditUser";
import { ProfileUser } from "../../../components/Api/UserRoutes";

export default function UserDashboard() {
  const { userName, setUserEmail, setUserRole } = useAuth();
  const [isLoading, setIsLoading] = useState("LOADING"); // LOADING, SUCCESSFUL, ERROR
  const [isLoadingUser, setIsLoadingUser] = useState("LOADING"); // LOADING, SUCCESSFUL, ERROR

  const [userRoadmaps, setUserRoadmaps] = useState([]);
  const [userData, setUserData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [roadmapDeleting, setRoadmapDeleting] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);

  const deleteRoadmap = (dataRoadmap) => {
    setRoadmapDeleting(dataRoadmap);
    setIsOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoadingUser("LOADING");
      setIsLoading("LOADING");
      //DATOS DE ROADMAPS
      try {
        const response = await getUserRoadmaps();

        if (response.status == 200) {
          setUserRoadmaps(response.data.roadmaps);
          setIsLoading("SUCCESSFUL");
        } else {
          setIsLoading("ERROR");
        }
      } catch (error) {
        setIsLoading("ERROR");
        console.log("error al obtener los roadmaps", error);
      }

      //DATOS DEL USUARIO
      try {
        const responseUserData = await ProfileUser();

        if (responseUserData.status == 200) {
          setUserData(responseUserData.data);
          setIsLoadingUser("SUCCESSFUL");
        } else {
          setIsLoadingUser("ERROR");
        }
      } catch (error) {
        setIsLoadingUser("ERROR");
        console.log("Profile error", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {isEditModalOpen == true && (
        <EditUser userData={userData} setIsEditModalOpen={setIsEditModalOpen} />
      )}
      {isOpen == true && (
        <ModalConfirmation
          title={"Confimar eliminacion del roadmap"}
          body={
            <>
              <p className="text-lg">id: {roadmapDeleting._id}</p>
              <p className="text-ls">Nombre: {roadmapDeleting.roadmapName}</p>
            </>
          }
          isOpen={setIsOpen}
          execFunction={DeleteRoadmap}
          idItem={roadmapDeleting._id}
        />
      )}
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {isLoadingUser == "LOADING" ? (
          <LoadingScreen
            className={"my-24"}
            textLoading={"Cargando dashboard, porfavor espere..."}
          />
        ) : isLoadingUser == "SUCCESSFUL" ? (
          <>
            <div className="mb-5 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex ">
                    <div>
                      <GraduationCap className="w-10 h-10 mr-2" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Bienvenido de vuelta,{" "}
                        {`${userData.name}  ${userData.lastName}`}!
                      </h2>
                      <p className="mt-1 text-gray-600">{userData.email}</p>
                      <p className="text-base text-gray-500">Estudiante</p>
                    </div>
                  </div>
                  <button
                    onClick={openEditModal}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar perfil
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-indigo-100 p-6 rounded-lg transform transition duration-500 hover:scale-105">
                    <div className="flex items-center mb-4">
                      <Zap className="w-8 h-8 text-indigo-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-800">
                        Roadmaps Creados
                      </h3>
                    </div>
                    <p className="text-4xl font-bold text-indigo-600">
                      {userRoadmaps.length}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Sigue aprendiendo y creando!
                    </p>
                  </div>
                  {/* <div className="bg-green-100 p-6 rounded-lg transform transition duration-500 hover:scale-105">
                    <div className="flex items-center mb-4">
                      <BookOpen className="w-8 h-8 text-green-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-800">
                        Cursos Completados
                      </h3>
                    </div>
                    <p className="text-4xl font-bold text-green-600">
                      {user.coursesCompleted}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      ¡Excelente progreso!
                    </p>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="mb-12 bg-white rounded-xl shadow-md overflow-hidden ">
              <div className="flex border-b">
                <button
                  className={
                    "flex-1 text-center py-4 text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                  }
                >
                  Mis ruta de aprendizaje IA
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {isLoading == "LOADING" ? (
                    <LoadingScreen
                      textLoading={"Cargando, porfavor espere..."}
                    />
                  ) : isLoading == "SUCCESSFUL" ? (
                    <>
                      {userRoadmaps.map((roadmap) => {
                        const colorIcons = ColorsIcons();

                        return (
                          <div
                            key={roadmap._id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-4 ">
                              <div
                                className={`bg-green-100 rounded-full p-3 ${colorIcons.color}`}
                              >
                                <colorIcons.icon
                                  className={`w-5 h-5 text-green-600 mr-1 ${colorIcons.color}`}
                                />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                  {roadmap.roadmapName}
                                </h3>
                              </div>
                            </div>
                            <div className="">
                              <Link
                                to={`/roadmap/${roadmap._id}`}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
                              >
                                Ver ruta
                              </Link>
                              <button
                                onClick={() => deleteRoadmap(roadmap)}
                                className="bg-red-500 text-white px-4 py-2 ml-2 rounded-full hover:bg-red-600 transition duration-300"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <ErrorMessage />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <ErrorMessage
            message={"Ërror al cargar los datos"}
            execAction={() => {
              window.location.reload();
            }}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
