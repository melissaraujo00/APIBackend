import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ChevronLeft } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getRoadmap } from "../../components/Api/UserRoutes";
import { LoadingScreen } from "../../components/LoadingScreen";
import { ErrorMessage } from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import ColorsIcons from "../../components/ColorsIcons";
import ConvertToEmbetURLS from "./ConvertToEmbetURLS";

const LessonItem = ({ lesson, colorsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorData = ColorsIcons();

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left rounded-md transition-colors duration-200 ease-in-out hover:bg-slate-300 p-1"
      >
        <div className="flex items-center">
          <colorData.icon className={`w-6 h-6 ${colorsData.textColor} mr-2`} />
          <span className="font-medium">{lesson.name}</span>
        </div>
        <div className="flex items-center">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 ml-7 pl-3 border-l-2 border-gray-200">
          {/* <p className="text-sm text-gray-600 mb-2">{lesson.description}</p> */}
          <p className="text-sm text-gray-600 mb-2">
            <ReactMarkdown>{lesson.description}</ReactMarkdown>
          </p>
          <iframe
            className="w-6/12 aspect-video rounded-lg"
            src={ConvertToEmbetURLS(lesson.videoUrl)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

const PersonalizedRoadmap = () => {
  const [isLoading, setisLoading] = useState("LOADING"); //NOT, LOADING, SUCCESSFUL, ERROR
  const [errorMessage, setErrorMessage] = useState("");
  const [roadmapContent, setRoadmapContent] = useState([]);
  const [roadmapName, setroadmapName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    setisLoading("LOADING");
    try {
      const response = await getRoadmap(id);

      if (response.status == 200) {
        setRoadmapContent(response.data.roadmap);
        setroadmapName(response.data.roadmapName);
        setisLoading("SUCCESSFUL");
      } else {
        setErrorMessage("Error desconocido...");
        setisLoading("ERROR");
      }
    } catch (error) {
      console.log("error", error);
      setErrorMessage(error.message);
      setisLoading("ERROR");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-24">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-8">
          {isLoading == "LOADING" ? (
            <LoadingScreen
              className={"my-36 scale-90"}
              textLoading={"Cargando, por favor espere..."}
            />
          ) : isLoading == "SUCCESSFUL" ? (
            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center px-2 pr-5 py-2 mb-4 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
              >
                <ChevronLeft className="mr-2" />
                Regresar
              </button>
              <h1 className="text-3xl font-bold mb-4">{roadmapName}</h1>
              <div className="w-full">
                <p className="text-gray-600 mb-4 text-lg">
                  Esta ruta de aprendizaje generada por IA se adapta a su estilo
                  de aprendizaje, habilidades actuales.
                </p>
              </div>
              <h2 className="text-2xl font-semibold mb-6">
                Your Learning Path
              </h2>
              <div className="space-y-6">
                {roadmapContent.map((section, index) => {
                  const colorsData = ColorsIcons();
                  return (
                    <div
                      key={index}
                      className={`${colorsData.color} rounded-lg p-4 `}
                    >
                      <div className="flex items-center mb-4">
                        <colorsData.icon
                          className={`w-6 h-6 ${colorsData.textColor} mr-2`}
                        />
                        <h3
                          className={`text-xl font-semibold ${colorsData.textColor}`}
                        >
                          {section.name}
                        </h3>
                      </div>
                      <div className="space-y-2 ">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <LessonItem
                            key={lessonIndex}
                            lesson={lesson}
                            colorsData={colorsData}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <ErrorMessage
              className={"my-32"}
              message={`Error al cargar la ruta de aprendizaje:  ${errorMessage}`}
              textButton={"Reintentar"}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalizedRoadmap;
