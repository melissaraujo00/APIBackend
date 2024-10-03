import { Notebook, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { GetAllModules } from "../../components/Api/ModulesRoutes";
import { LoadingScreen } from "../../components/LoadingScreen";

export default function CoursesCatalog() {
  const [ModulesData, setModulesData] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await GetAllModules();
        if (response.status == 200) {
          setModulesData(response.data);
        } else {
          console.log("Error");
        }
      } catch (error) {}
    };

    setTimeout(() => {
      GetData();
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {ModulesData.length == 0 ? (
          <LoadingScreen
            className={"my-32"}
            textLoading={"Cargando cursos..."}
          />
        ) : (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Explora nuestros cursos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ModulesData.map((item, key) => (
                <div
                  key={key}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6 h-full flex flex-col ">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.titulo}
                    </h2>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Notebook className="w-4 h-4 mr-1" />
                          <span>{item.temas.length} Lecciones </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        {item.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <Link
                        to={`/viewcourse/${item._id}`}
                        className="flex bg-indigo-600 text-white px-5 py-1 rounded-full font-semibold hover:bg-indigo-700 transition duration-300"
                      >
                        Ver
                        <ChevronRight className="ml-2 " />
                      </Link>
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
                        {item.nivel}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
