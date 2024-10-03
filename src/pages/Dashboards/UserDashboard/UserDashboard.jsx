import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useAuth } from "../../../auth/useAuth";
import { DeleteRoadmap, getUserRoadmaps } from "../../../components/Api/RoadmapRoutes";
import ColorsIcons from "../../../components/ColorsIcons";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { ErrorMessage } from "../../../components/ErrorMessage";
import ModalConfirmation from "../adminDashboard/ModalConfirmation";

export default function UserDashboard() {
  const { userName } = useAuth();
  const [isLoading, setIsLoading] = useState("LOADING"); // LOADING, SUCCESSFUL, ERROR
  const [userRoadmaps, setUserRoadmaps] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [roadmapDeleting, setRoadmapDeleting] = useState();

  const deleteRoadmap = (dataRoadmap) => {
    setRoadmapDeleting(dataRoadmap);
    setIsOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading("LOADING");
      try {
        const response = await getUserRoadmaps();

        if (response.status == 200) {
          setUserRoadmaps(response.data.roadmaps);
          setIsLoading("SUCCESSFUL");
        }
      } catch (error) {
        console.log("error al obtener los roadmaps", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome back, {userName}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Roadmaps Creados
              </h2>
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-indigo-600 mb-2">
              {userRoadmaps.length}
            </p>
            <p className="text-gray-600 text-sm">Sigue aprendiendo!</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
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
                <LoadingScreen textLoading={"Cargando, porfavor espere..."} />
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
                            Ver ruta de aprendizaje
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
      </main>
      <Footer />
    </div>
  );
}
