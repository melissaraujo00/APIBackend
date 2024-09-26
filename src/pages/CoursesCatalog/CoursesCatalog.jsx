import {
  Search,
  Filter,
  Book,
  Clock,
  Star,
  Users,
  Zap,
  ChevronDown,
  Notebook,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { GetAllModules } from "../../components/Api/ModulesRoutes";
import { LoadingScreen } from "../../components/LoadingScreen";

export default function CoursesCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ModulesData, setModulesData] = useState([]);
  console.log("ModulesData", ModulesData);

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
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.titulo}
                    </h2>
                    {/* <p className="text-gray-600 mb-4">{item.titulo}</p> */}
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
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/course/${item._id}`}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-300"
                      >
                        Ver
                      </Link>
                      {/* {course.isAIPersonalized && (
                    <div className="flex items-center text-green-600">
                      <Zap className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">
                        AI Personalized
                      </span>
                    </div>
                  )} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
      {/* <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">FutureCode</h3>
              <p className="mt-2 text-sm text-gray-400">
                Empowering developers with AI-enhanced learning
              </p>
            </div>
            <div className="w-full md:w-auto text-center md:text-right">
              <p>&copy; 2024 FutureCode. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
