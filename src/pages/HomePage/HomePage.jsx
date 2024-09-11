import React from "react";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Users,
  Zap,
  Brain,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white font-sans">
      <Header />

      <main>
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Aprende con IA,
              <br />
              <span className="text-indigo-600">Domina con Práctica</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Descubre una nueva forma de aprender JavaScript con cursos
              personalizados por IA y contenido estándar de alta calidad.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className=" bg-indigo-600 text-white text-lg px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 flex items-center justify-center cursor-pointer"
              >
                Comenzar Ahora <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              ¿Por qué elegir FutureCode?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
              {[
                {
                  icon: Brain,
                  title: "IA Personalizada",
                  description:
                    "Cursos adaptados a tu estilo de aprendizaje y nivel de conocimiento.",
                },
                {
                  icon: Zap,
                  title: "Aprendizaje Práctico",
                  description:
                    "Proyectos del mundo real para aplicar tus conocimientos inmediatamente.",
                },
                {
                  icon: Sparkles,
                  title: "Contenido Actualizado",
                  description:
                    "Material de estudio siempre al día con las últimas tendencias y mejores prácticas.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <item.icon className="w-12 h-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nuestro Enfoque de Aprendizaje
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4 flex items-center">
                  <Brain className="w-6 h-6 mr-2" /> Contenido Personalizado con
                  IA
                </h3>
                <ul className="space-y-2">
                  {[
                    "Adaptación dinámica al ritmo de aprendizaje",
                    // "Recomendaciones de contenido basadas en tu progreso",
                    "Ejercicios generados por IA para reforzar conceptos",
                    "Feedback personalizado en tiempo real",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-2xl font-semibold text-indigo-600 mb-4 flex items-center">
                  <Code className="w-6 h-6 mr-2" /> Contenido Estándar de Alta
                  Calidad
                </h3>
                <ul className="space-y-2">
                  {[
                    "Contenido estructurado y probado",
                    // "Proyectos prácticos del mundo real",
                    "Acceso a recursos adicionales curados",
                    // "Certificaciones reconocidas por la industria",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
