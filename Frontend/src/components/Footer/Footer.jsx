import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">FutureCode</h3>
            <p className="text-gray-400">
              Revolucionando el aprendizaje con IA y contenido de calidad.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link
                  to="/RoadmapCreator"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  IA Personalizada
                </Link>
              </li>
              <li>
                <button
                  // to="#about"
                  onClick={() => {
                    window.scrollTo({
                      top: document.documentElement.scrollHeight,
                      behavior: "smooth",
                    });
                  }}
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Sobre nosotros
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contáctanos</h4>
            <p className="text-gray-400">info@FutureCode.com</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
            <div className="flex space-x-4 mt-4">
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 FutureCode. Todos los derechos reservados. </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
