import React, { useState } from "react";

import {
  Coffee,
  Droplet,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Code,
  Globe,
  Server,
  Layers,
  Zap,
  Database,
  Cloud,
  Lock,
  Users,
  Cog,
  Briefcase,
  Book,
  Cpu,
  Smartphone,
  Wifi,
  Headphones,
  Camera,
  Pen,
  Palette,
  Compass,
  Anchor,
  Aperture,
  Archive,
  FileText,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import { LoadingScreen } from "../../components/LoadingScreen";
import { ErrorMessage } from "../../components/ErrorMessage";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { MakeRoadmap, SaveRoadmap } from "../../components/Api/GeminiRoutes";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import ColorsIcons from "../../components/ColorsIcons";
import "react-toastify/dist/ReactToastify.css";
import ConvertToEmbetURLS from "./ConvertToEmbetURLS";

const questions = [
  {
    id: "b1",
    text: "¿Qué es JavaScript y para qué se utiliza?",
    level: "Básico",
    options: [
      "Es un lenguaje de programación utilizado para dar interactividad a las páginas web.",
      "Es una herramienta para gestionar bases de datos.",
      "Es un lenguaje de programación que se usa principalmente para backend.",
      "Es un software que sirve para diseñar imágenes.",
      "No lo sé",
    ],
  },
  {
    id: "b2",
    text: "¿Cuál es la diferencia entre let, const y var?",
    level: "Básico",
    options: [
      "let y const tienen alcance de bloque, var tiene alcance global o de función.",
      "const es una variable que no se puede cambiar, mientras que let y var sí.",
      "let es para variables locales y const para globales.",
      "const sirve solo para constantes, let y var para variables globales.",
      "No lo sé",
    ],
  },
  {
    id: "b3",
    text: "¿Qué es una función en JavaScript y cómo se declara?",
    level: "Básico",
    options: [
      "Es un bloque de código que realiza una tarea específica, se declara con la palabra 'function'.",
      "Es una variable que almacena un conjunto de datos.",
      "Es una instrucción para ejecutar loops en JavaScript.",
      "Se declara usando la palabra clave 'const'.",
      "No lo sé",
    ],
  },
  {
    id: "b4",
    text: "¿Qué es un array en JavaScript y cómo se utiliza?",
    level: "Básico",
    options: [
      "Es una estructura de datos que almacena múltiples valores en una sola variable.",
      "Es una función especial de JavaScript para ejecutar tareas repetitivas.",
      "Es un tipo de dato que contiene solo números enteros.",
      "Es un bucle que se utiliza para repetir una operación varias veces.",
      "No lo sé",
    ],
  },
  {
    id: "b5",
    text: "¿Tipos de bucles condicionales en JavaScript?",
    level: "Básico",
    options: [
      "for, while, do-while.",
      "if, else, switch.",
      "forEach, map, filter.",
      "for, foreach, switch.",
      "No lo sé",
    ],
  },
  {
    id: "i1",
    text: "¿Qué es el DOM (Document Object Model) y cómo se manipula con JavaScript?",
    level: "Intermedio",
    options: [
      "Es una representación en árbol de una página web que se puede manipular con JavaScript.",
      "Es una API que permite gestionar archivos del servidor.",
      "Es el motor que ejecuta JavaScript en el navegador.",
      "Es una interfaz para crear gráficos en JavaScript.",
      "No lo sé",
    ],
  },
  {
    id: "i2",
    text: "¿Qué son los eventos en JavaScript y cómo funcionan?",
    level: "Intermedio",
    options: [
      "Son acciones que ocurren en la página web, como un clic, y pueden ser detectadas por JavaScript.",
      "Son métodos especiales que se ejecutan de forma automática.",
      "Son condiciones lógicas que activan funciones.",
      "Son comandos que ejecutan un bloque de código al final de la página.",
      "No lo sé",
    ],
  },
  {
    id: "i3",
    text: "¿Qué es una promesa en JavaScript y para qué se utiliza?",
    level: "Intermedio",
    options: [
      "Es un objeto que representa la eventual finalización de una operación asíncrona.",
      "Es un bloque de código que se ejecuta en un tiempo futuro.",
      "Es un método que permite manejar eventos de usuarios.",
      "Es una estructura de datos que almacena valores futuros.",
      "No lo sé",
    ],
  },
  {
    id: "i4",
    text: "¿Cuál es la diferencia entre una función síncrona y asíncrona?",
    level: "Intermedio",
    options: [
      "Una función síncrona se ejecuta secuencialmente, mientras que una asíncrona no bloquea el hilo principal.",
      "Una función síncrona es más rápida que una asíncrona.",
      "Una función asíncrona se ejecuta automáticamente, mientras que la síncrona necesita ser llamada.",
      "No hay diferencias técnicas entre ambas.",
      "No lo sé",
    ],
  },
  {
    id: "i5",
    text: "¿Qué es un objeto en JavaScript y cómo se crean propiedades o métodos en él?",
    level: "Intermedio",
    options: [
      "Un objeto es una colección de propiedades y métodos, definidos dentro de llaves.",
      "Es una variable que almacena múltiples tipos de datos.",
      "Es un método que ejecuta funciones automáticas.",
      "Es un bucle que se utiliza para crear nuevas instancias de variables.",
      "No lo sé",
    ],
  },
  {
    id: "a1",
    text: '¿Cómo maneja JavaScript la concurrencia y qué es el "Event Loop"?',
    level: "Avanzado",
    options: [
      "El Event Loop permite que JavaScript maneje operaciones asíncronas sin bloquear el hilo principal.",
      "Es una función que mantiene en pausa el código hasta que se complete una operación.",
      "Es un ciclo que repite acciones indefinidamente.",
      "Es una estructura de control que permite ejecutar funciones en paralelo.",
      "No lo sé",
    ],
  },
  {
    id: "a2",
    text: '¿Qué es el concepto de "hoisting" en JavaScript?',
    level: "Avanzado",
    options: [
      "Es el comportamiento que mueve las declaraciones de variables y funciones al inicio de su contexto de ejecución.",
      "Es una técnica para mejorar la velocidad del código.",
      "Es una forma de detener la ejecución del código en un momento específico.",
      "Es una característica para gestionar ciclos en bucles.",
      "No lo sé",
    ],
  },
  {
    id: "a3",
    text: '¿Qué es un "closure" y en qué situaciones es útil?',
    level: "Avanzado",
    options: [
      "Es una función que recuerda su contexto léxico incluso fuera de él.",
      "Es un tipo especial de función que no acepta parámetros.",
      "Es una variable que puede cambiar su valor en tiempo de ejecución.",
      "Es una estructura de datos que almacena funciones.",
      "No lo sé",
    ],
  },
  {
    id: "a4",
    text: "¿Cómo se implementa la herencia en JavaScript y qué es el prototipo?",
    level: "Avanzado",
    options: [
      "JavaScript usa herencia prototipal, permitiendo a los objetos heredar de otros objetos.",
      "Herencia se implementa usando 'class' y 'super'.",
      "Los objetos heredan propiedades usando el constructor de la clase padre.",
      "Herencia se implementa utilizando un bucle que copia propiedades.",
      "No lo sé",
    ],
  },
  {
    id: "a5",
    text: "¿Cómo funcionan async/await y cómo facilitan el manejo de promesas?",
    level: "Avanzado",
    options: [
      "Permiten manejar código asíncrono de manera secuencial y legible.",
      "Son palabras clave que permiten detener la ejecución del código hasta que se resuelva una promesa.",
      "async detiene el código hasta que await completa la operación.",
      "Son métodos que se usan para manejar ciclos de eventos.",
      "No lo sé",
    ],
  },
];

const LessonItem = ({ lesson, colorsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorData = ColorsIcons();

  // function convertToEmbedURL(url) {
  //   // Expresión regular para extraer el ID del video de diferentes tipos de enlaces
  //   const regex =
  //     /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([\w-]{11})/;

  //   // Intentamos hacer match con la URL
  //   const match = url.match(regex);

  //   // Si hay coincidencia, formamos el enlace embebido; si no, retornamos null
  //   if (match) {
  //     const videoID = match[1];
  //     return `https://www.youtube.com/embed/${videoID}`;
  //   } else {
  //     return null; // Si no es un enlace de YouTube válido
  //   }
  // }

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

const RoadmapMenu = ({ roadmapData = [], regenerateRoadmap }) => {
  const roadmapContent = roadmapData.roadmap;
  const roadmapName = roadmapData.roadmapName;
  const [isSaving, setIsSaving] = useState(false);

  const savingRoadmap = async () => {
    if (isSaving == false) {
      const toastId = toast.loading("Guardando ruta de aprendizaje...");

      try {
        // console.log({ roadmap: roadmapData });
        const savingResponse = await SaveRoadmap({
          roadmapName: roadmapName,
          roadmap: roadmapContent,
        });

        if (savingResponse.status == 200) {
          //Roadmap guardado exitosamente
          toast.update(toastId, {
            render: "Ruta de aprendizaje guardada exitosamente",
            type: "success",
            isLoading: false,
            icon: "🟢",
            autoClose: 3500,
            pauseOnHover: false,
          });
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
        }
        console.log("savingResponse:", savingResponse);
      } catch (error) {
        console.log("Error catch", error);

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
            render: "Error en el servidor",
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

  const RegeneratedRoadmap = async () => {
    regenerateRoadmap();
    // console.log(regenerateRoadmap)
  };

  return (
    <div className="pt-24">
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
      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-4">{roadmapName}</h1>
        <div className="flex mb-4">
          <div className="w-full">
            <p className="text-gray-600 mb-4 text-lg">
              Esta ruta de aprendizaje generada por IA se adapta a su estilo de
              aprendizaje, habilidades actuales.
            </p>
          </div>
          <div className="flex flex-col w-4/12 justify-center ">
            <button
              onClick={() => savingRoadmap()}
              className="flex items-center justify-center px-4 py-2 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 mb-2 transition-all"
            >
              Guardar ruta de aprendizaje
            </button>
            <button
              onClick={() => RegeneratedRoadmap()}
              className="flex items-center justify-center px-4 py-2 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
            >
              Volver a generar
            </button>
          </div>
        </div>

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
    </div>
  );
};

export default function AIRoadmapCreation() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [roadmap, setRoadmap] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [generationStatus, setGenerationStatus] = useState("NOT"); //NOT, LOADING, SUCCESSFUL, ERROR

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isOptionSelected = responses[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  //Guarda la opcion seleccionada
  const handleResponseChange = (questionId, value) => {
    const question = questions.find((q) => q.id === questionId);

    setResponses((prev) => ({
      ...prev,
      [questionId]: {
        question: question.text,
        answer: question.options[value],
        level: question.level,
      },
    }));
  };

  //Pasar a la siguiente pregunta o  terminar el cuestionario
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      generateRoadmap();
    }
  };

  //Pasar a la anterior pregunta
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  //Generar el roadmap
  const generateRoadmap = async () => {
    setGenerationStatus("LOADING");
    setRoadmap([]);
    // console.log("responses", responses);

    try {
      const responseMakeRoadmap = await MakeRoadmap(responses);

      if (responseMakeRoadmap.status == 200) {
        console.log("Roadmap generado", responseMakeRoadmap.data);

        setRoadmap(responseMakeRoadmap.data);
        setGenerationStatus("SUCCESSFUL");
      } else {
        setGenerationStatus("ERROR");
      }
    } catch (error) {
      setGenerationStatus("ERROR");
      console.log("Error generate roadmap", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {generationStatus == "NOT" ? (
          <div className="pt-24 pb-14 ">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8 ">
              Crea tu Roadmap de JavaScript Personalizado
            </h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Pregunta {currentQuestionIndex + 1} de {questions.length}
                </h2>
                <div className="mb-4 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-700 mb-4">{currentQuestion.text}</p>
                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center p-2 rounded-lg hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={index}
                        // checked={responses[currentQuestion.id] === index}
                        checked={
                          responses[currentQuestion.id]?.answer === option
                        }
                        onChange={() =>
                          handleResponseChange(currentQuestion.id, index)
                        }
                        className="form-radio h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Anterior
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!isOptionSelected}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                      isOptionSelected
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-400 cursor-not-allowed"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {isLastQuestion ? "Generar Roadmap" : "Siguiente"}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : generationStatus == "LOADING" ? (
          <LoadingScreen
            className="py-60"
            textLoading={"Generando ruta de aprendizaje"}
          />
        ) : generationStatus == "SUCCESSFUL" ? (
          <RoadmapMenu
            roadmapData={roadmap}
            regenerateRoadmap={generateRoadmap}
          />
        ) : (
          <ErrorMessage
            className="py-56"
            message={"Error al generar la ruta de aprendizaje"}
            execAction={generateRoadmap}
            textButton={"Reintentar"}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
