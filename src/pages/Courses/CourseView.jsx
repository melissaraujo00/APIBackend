import React, { useState, useEffect } from "react";
import { Book, Clock, Tag, ArrowLeft, ChevronDown } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ConvertToEmbetURLS from "../RoadmapPage/ConvertToEmbetURLS";
import { GetOneModule } from "../../components/Api/ModulesRoutes";
import { LoadingScreen } from "../../components/LoadingScreen";
import { ErrorMessage } from "../../components/ErrorMessage";
import Markdown from "react-markdown";

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Button component
const Button = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          "h-10 py-2 px-4",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Badge component
const Badge = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "bg-primary/10 text-primary border-transparent",
      className
    )}
    {...props}
  />
));
Badge.displayName = "Badge";

// Card components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Accordion components
const Accordion = ({ children, ...props }) => {
  return (
    <div className="space-y-2" {...props}>
      {children}
    </div>
  );
};

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border rounded-lg overflow-hidden", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  ({ className, children, isOpen, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex w-full items-center justify-between px-4 py-4 font-medium transition-all hover:bg-muted/50",
          isOpen && "bg-muted",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(
  ({ className, children, isOpen, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all",
          isOpen ? "opacity-100" : "max-h-0 opacity-0",
          className
        )}
        {...props}
      >
        <div className="px-4 py-4">{children}</div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

// Main CourseView component
export default function CourseView() {
  const [isLoading, setIsLoading] = useState("LOADING"); //NOT, LOADING, SUCCESSFUL, ERROR
  const [courseData, setCourse] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [openAccordionItem, setOpenAccordionItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // const courseData = {
  //   _id: "66face3882be8d164652d905",
  //   imagen: "",
  //   titulo: "Introducción a JavaScript",
  //   temas: [
  //     {
  //       nombre: "Introducción",
  //       descripcion:
  //         "Es el lenguaje que le da vida a las páginas web. Permite crear páginas interactivas y dinámicas, desde simples animaciones hasta aplicaciones web completas. Imagina botones que responden a tus clics, menús desplegables y juegos que puedes jugar directamente en tu navegador. Todo esto es posible gracias a JavaScript. Es como el mago detrás de las cortinas, haciendo que las páginas web sean más divertidas y útiles.",
  //       urlvideos: [
  //         {
  //           descripcion:
  //             "En este video, se inicia un curso sobre JavaScript, proporcionando una introducción a su historia y características fundamentales. Se exploran los orígenes del lenguaje, su evolución a lo largo del tiempo y las cualidades que lo convierten en una herramienta esencial para el desarrollo web. Esta primera lección sienta las bases para entender el funcionamiento y las aplicaciones de JavaScript en proyectos futuros.",
  //           url: "https://youtu.be/2SetvwBV-SU?list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA",
  //           _id: "66face3882be8d164652d907",
  //         },
  //         {
  //           descripcion:
  //             "En esta primera entrega del curso básico de JavaScript, se introduce el lenguaje, explicando su esencia y la lógica que lo sustenta para la programación. Se analizan los conceptos fundamentales que permiten a los programadores comprender cómo interactuar con JavaScript de manera efectiva, sentando las bases para un aprendizaje más profundo en el desarrollo web.",
  //           url: "https://youtu.be/ye21CYdhm1s",
  //           _id: "66face3882be8d164652d908",
  //         },
  //       ],
  //       _id: "66face3882be8d164652d906",
  //     },
  //     {
  //       nombre: "Características y Gramática",
  //       descripcion:
  //         "JavaScript se caracteriza por ser un lenguaje de programación dinámico y flexible, lo que permite a los desarrolladores escribir código sin especificar el tipo de datos de antemano. Su gramática incluye conceptos fundamentales como variables, tipos de datos, operadores y estructuras de control, que son esenciales para estructurar y ejecutar programas. Además, JavaScript es interpretado por los navegadores, lo que facilita la prueba y ejecución en tiempo real. Estos aspectos lo convierten en una herramienta poderosa para crear aplicaciones interactivas y dinámicas en la web.",
  //       urlvideos: [
  //         {
  //           descripcion:
  //             "En este video, se destacan algunas de las características más importantes de JavaScript, brindando una visión general de su funcionamiento y versatilidad. Además, se discuten las reglas gramaticales que los programadores deben seguir al escribir código, lo que ayuda a garantizar que el código sea claro y eficiente. Este enfoque proporciona una base sólida para los desarrolladores que están comenzando con el lenguaje",
  //           url: "https://youtu.be/C5FXZ2ki13k?list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA",
  //           _id: "66face3882be8d164652d90a",
  //         },
  //         {
  //           descripcion:
  //             "En el video se aborda el concepto de JavaScript como un lenguaje de programación, diferenciándolo de HTML y CSS. Se destaca su capacidad para manejar datos de entrada y salida, así como su función en la interactividad de las páginas web, permitiendo que las acciones del usuario generen respuestas. Se presentan características fundamentales de JavaScript, como su tipado dinámico, su naturaleza interpretada, su enfoque en prototipos y su versatilidad en paradigmas de programación. Estos aspectos son cruciales para entender cómo funciona el lenguaje.",
  //           url: "https://youtu.be/Or9Dfa0zhls",
  //           _id: "66face3882be8d164652d90b",
  //         },
  //         {
  //           descripcion:
  //             "En el video se explican tres características clave de JavaScript: primero, permite crear **variables dinámicas**, donde el tipo de dato se determina automáticamente; segundo, es **débilmente tipado**, lo que implica que no es necesario especificar el tipo al declarar variables o funciones, lo que puede ser ventajoso pero arriesgado; y tercero, es **orientado a objetos**, permitiendo la creación de objetos y clases. Además, se enfatiza que JavaScript es interpretado directamente por los navegadores.",
  //           url: "https://youtu.be/c1IHTKDIbI0",
  //           _id: "66face3882be8d164652d90c",
  //         },
  //       ],
  //       _id: "66face3882be8d164652d909",
  //     },
  //   ],
  //   nivel: "principiante",
  //   __v: 0,
  // };
  useEffect(() => {
    const getData = async () => {
      try {
        const responseModule = await GetOneModule(id);
        if (responseModule.status == 200) {
          // console.log("responseModuleData", responseModule.data);
          setCourse(responseModule.data);
          setIsLoading("SUCCESSFUL");
        } else {
          setErrorMessage("Error desconocido");
        }
      } catch (error) {
        console.log("error", error);
        setErrorMessage("Error en la conexion");
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {isLoading == "LOADING" ? (
          <LoadingScreen
            className={"my-36 scale-90"}
            textLoading={"Cargando, por favor espere..."}
          />
        ) : isLoading == "SUCCESSFUL" ? (
          <>
            <div className="mb-8">
              <button
                onClick={() => navigate(-1)}
                href="/courses"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Regresar
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {courseData.titulo}
                  </h1>
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
                    {courseData.nivel.charAt(0).toUpperCase() +
                      courseData.nivel.slice(1)}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 ">
                    <Badge className="flex items-center">
                      <Book className="mr-1 h-4 w-4" />
                      {courseData.temas.length} Temas
                    </Badge>
                    <Badge className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {courseData.temas.reduce(
                        (acc, tema) => acc + tema.urlvideos.length,
                        0
                      )}{" "}
                      Videos
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contenido del Curso
              </h2>
              <Accordion>
                {courseData.temas.map((tema, index) => (
                  <AccordionItem key={tema._id}>
                    <AccordionTrigger
                      isOpen={openAccordionItem === index}
                      onClick={() =>
                        setOpenAccordionItem(
                          openAccordionItem === index ? null : index
                        )
                      }
                    >
                      <span className="flex items-center">
                        <Tag className="mr-2 h-5 w-5 text-indigo-500" />
                        {tema.nombre}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent isOpen={openAccordionItem === index}>
                      <p className="mb-6 text-gray-700">{tema.descripcion}</p>
                      <div className="">
                        {tema.urlvideos.map((video, videoIndex) => (
                          <Card key={video._id}>
                            <CardContent className={"flex"}>
                              <div className=" w-3/12 aspect-video border-gray-200 ">
                                <iframe
                                  className="w-full aspect-video rounded-lg"
                                  src={ConvertToEmbetURLS(video.url)}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  allowFullScreen
                                ></iframe>
                              </div>
                              <CardDescription className="mb-4 w-9/12 pl-4">
                                <Markdown>{video.descripcion}</Markdown>
                              </CardDescription>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </>
        ) : (
          <ErrorMessage
            className={"my-32"}
            message={`Error al cargar el curso: ${errorMessage}`}
            textButton={"Reintentar"}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
