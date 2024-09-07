import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">FutureCode</h3>
            <p className="text-gray-400">
              Revolucionando el aprendizaje de JavaScript con IA y contenido de
              calidad. 
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  to="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Cursos
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  IA Personalizada
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Recursos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contáctanos</h4>
            <p className="text-gray-400">info@ailearnpro.com</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
            <div className="flex space-x-4 mt-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 AILearnPro. Todos los derechos reservados. </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
