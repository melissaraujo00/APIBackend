import React, { useState } from "react";
import {
  ChevronDownIcon,
  CheckIcon,
  Book,
  LinkIcon,
  Plus,
  Trash2,
  Save,
  Video,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { SaveModule } from "../../components/Api/ModulesRoutes";
import { useAuth } from "../../auth/useAuth";

// Main Component
function CreateNewCoursePage() {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    imagen: "",
    titulo: "",
    temas: [
      {
        nombre: "",
        descripcion: "",
        urlvideos: [{ descripcion: "", url: "" }],
      },
    ],
    nivel: "principiante",
  });
  const [expandedTopics, setExpandedTopics] = useState([true]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleTopicChange = (index, field, value) => {
    const newTemas = [...course.temas];
    newTemas[index] = { ...newTemas[index], [field]: value };
    setCourse((prev) => ({ ...prev, temas: newTemas }));
  };

  const handleVideoChange = (topicIndex, videoIndex, field, value) => {
    const newTemas = [...course.temas];
    newTemas[topicIndex].urlvideos[videoIndex] = {
      ...newTemas[topicIndex].urlvideos[videoIndex],
      [field]: value,
    };
    setCourse((prev) => ({ ...prev, temas: newTemas }));
  };

  const addTopic = () => {
    setCourse((prev) => ({
      ...prev,
      temas: [
        ...prev.temas,
        {
          nombre: "",
          descripcion: "",
          urlvideos: [{ descripcion: "", url: "" }],
        },
      ],
    }));
    setExpandedTopics((prev) => [...prev, true]);
  };

  const removeTopic = (index) => {
    setCourse((prev) => ({
      ...prev,
      temas: prev.temas.filter((_, i) => i !== index),
    }));
    setExpandedTopics((prev) => prev.filter((_, i) => i !== index));
  };

  const addVideo = (topicIndex) => {
    const newTemas = [...course.temas];
    newTemas[topicIndex].urlvideos.push({ descripcion: "", url: "" });
    setCourse((prev) => ({ ...prev, temas: newTemas }));
  };

  const removeVideo = (topicIndex, videoIndex) => {
    const newTemas = [...course.temas];
    newTemas[topicIndex].urlvideos = newTemas[topicIndex].urlvideos.filter(
      (_, i) => i !== videoIndex
    );
    setCourse((prev) => ({ ...prev, temas: newTemas }));
  };

  const toggleTopic = (index) => {
    setExpandedTopics((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const options = [
    { value: "principiante", label: "Principiante" },
    { value: "intermedio", label: "Intermedio" },
    { value: "avanzado", label: "Avanzado" },
  ];

  const handleSelect = (value) => {
    setCourse((prev) => ({ ...prev, nivel: value }));
    setIsOpen(false);
  };

  const CancelSubmitDefaultc = (e) => {
    e.preventDefault();
  };

  const validationData = () => {
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

    if (course.titulo == "") {
      Alerta("Titulo");
    }
    if (course.temas[0].nombre == "") {
      Alerta("Nombre de la primera leccion.");
    }
    if (course.temas[0].descripcion == "") {
      Alerta("Descripcion de la primera leccion.");
    }
    if (course.temas[0].urlvideos[0].url == "") {
      Alerta("URL del primer video de la primera leccion.");
    }
    if (course.temas[0].urlvideos[0].descripcion == "") {
      Alerta("Descripcion del primer video de la primera leccion.");
    }

    return firsToast == 0 ? true : false;
  };

  const SaveCourse = async () => {
    const validate = validationData();

    if (validate === true) {
      toast.dismiss();
      const toastId = toast.loading("Publicando...");

      try {
        const responseModule = await SaveModule(course);
        if (responseModule.status == 201) {
          //Curso guardado exitosamente
          toast.update(toastId, {
            render: "Curso publicado exitosamente!",
            type: "success",
            isLoading: false,
            icon: "🟢",
            autoClose: 3000,
            pauseOnHover: false,
          });

          setTimeout(() => {
            if (userRole == "profesor") {
              navigate("/teacher");
            } else {
              navigate("/admin");
            }
          }, 1300);
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
        console.log("error", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <ToastContainer closeOnClick={true} />
      <main className="max-w-3xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 py-12 ">
        <div className=" bg-white p-5 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className='flex flex-col space-y-1.5 p-6", className'>
            <div className="flex items-center justify-between text-2xl font-semibold leading-none tracking-tight">
              <span className="text-3xl font-bold">Crear nuevo curso</span>
              <Book className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="pt-6">
            <form onSubmit={CancelSubmitDefaultc} className="space-y-6">
              <div>
                <label
                  htmlFor="titulo"
                  className="block text-base font-medium text-muted-foreground mb-3"
                >
                  Titulo del curso
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={course.titulo}
                  onChange={handleCourseChange}
                  className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:ring-gray-400 focus:border-gray-300"
                  placeholder="Titulo"
                />
              </div>
              <div>
                <label
                  htmlFor="nivel"
                  className="block text-base font-medium text-muted-foreground mb-3"
                >
                  Nivel
                </label>
                <div className="relative w-full mx-auto ">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-300"
                  >
                    <span>
                      {options.find((opt) => opt.value === course.nivel)?.label}
                    </span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {options.map((option) => (
                        <button
                          key={option.value}
                          className={`flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-100 ${
                            course.nivel === option.value && "bg-gray-100"
                          }`}
                          onClick={() => handleSelect(option.value)}
                        >
                          <span>{option.label}</span>
                          {course.nivel === option.value && (
                            <CheckIcon className="w-5 h-5 text-blue-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-base font-medium text-muted-foreground mb-3">
                  Lecciones
                </label>
                {course.temas.map((tema, topicIndex) => (
                  <div
                    key={topicIndex}
                    className="mb-4 rounded-lg border bg-card text-card-foreground shadow-sm"
                  >
                    <div
                      className="py-2 px-4 cursor-pointer flex flex-col space-y-1.5 p-6"
                      onClick={() => toggleTopic(topicIndex)}
                    >
                      <div className="text-lg flex items-center font-semibold leading-none tracking-tight justify-between ">
                        {/* Titulo */}
                        <span>
                          {tema.nombre || `Leccion ${topicIndex + 1}`}
                        </span>
                        {/* Boton eliminar  */}
                        <div className="flex items-center ">
                          {topicIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => removeTopic(topicIndex)}
                              className="inline-flex items-center px-3 py-2 mx-5 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar leccion
                            </button>
                          )}
                          {/* Cerrar/abrir pentañá */}
                          <div className=" rounded-full bg-gray-100 hover:bg-gray-200">
                            {expandedTopics[topicIndex] ? (
                              <ChevronUp className="h-5 w-5 m-1.5" />
                            ) : (
                              <ChevronDown className="h-5 w-5 m-1.5" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {expandedTopics[topicIndex] && (
                      <div className="py-4 px-6 p-6 pt-0">
                        <label className="block text-sm font-medium text-gray-700 mt-1 mb-2">
                          Nombre de la leccion
                        </label>
                        <input
                          type="text"
                          value={tema.nombre}
                          onChange={(e) =>
                            handleTopicChange(
                              topicIndex,
                              "nombre",
                              e.target.value
                            )
                          }
                          className="mb-2 mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:ring-gray-400 focus:border-gray-300"
                          placeholder="Nombre de la leccion"
                        />

                        <label className="block text-sm font-medium text-gray-700 mt-1 mb-2">
                          Descripción de la leccion
                        </label>
                        <textarea
                          value={tema.descripcion}
                          onChange={(e) =>
                            handleTopicChange(
                              topicIndex,
                              "descripcion",
                              e.target.value
                            )
                          }
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-2 focus:ring-gray-400 focus:border-gray-300"
                          placeholder="Descripción de la leccion"
                          rows={3}
                        />
                        <div className="mb-2">
                          <label className="block text-sm font-medium text-muted-foreground mt-1 mb-2">
                            Videos
                          </label>

                          {tema.urlvideos.map((video, videoIndex) => (
                            <div
                              key={videoIndex}
                              className=" mb-2 border-l-2 border-indigo-200 pl-4"
                            >
                              <label className="block text-sm font-medium text-gray-700 mt-1 mb-2">
                                Descripción del Video
                              </label>
                              <textarea
                                value={video.descripcion}
                                onChange={(e) =>
                                  handleVideoChange(
                                    topicIndex,
                                    videoIndex,
                                    "descripcion",
                                    e.target.value
                                  )
                                }
                                className="flex-grow mr-2 mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:ring-gray-400 focus:border-gray-300"
                                placeholder="Descripción del Video"
                                rows={3}
                              />
                              <label className="block text-sm font-medium text-gray-700">
                                URL del Video
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                  <LinkIcon className="h-5 w-5 text-gray-400" />
                                </div>

                                <input
                                  type="url"
                                  value={video.url}
                                  onChange={(e) =>
                                    handleVideoChange(
                                      topicIndex,
                                      videoIndex,
                                      "url",
                                      e.target.value
                                    )
                                  }
                                  className={
                                    "border border-input text-sm focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:ring-gray-400 focus:border-gray-300 block w-full pl-10 mt-2 h-7 sm:text-sm border-gray-300 rounded-md"
                                  }
                                  placeholder="URL del Video"
                                />
                              </div>
                              <button
                                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() =>
                                  removeVideo(topicIndex, videoIndex)
                                }
                              >
                                <Trash2 className="h-4 w-4  mr-3" />
                                Eliminar video
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addVideo(topicIndex)}
                            variant="outline"
                            size="sm"
                            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Añadir video
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTopic}
                  variant="outline"
                  size="sm"
                  className="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir leccion
                </button>
              </div>
              <div className="flex justify-between">
                <button className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="flex"
                  >
                    Cancelar
                  </button>
                </button>
                <button
                  type="submit"
                  onClick={() => SaveCourse()}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Publicar curso
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CreateNewCoursePage;
