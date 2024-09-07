import React from "react";
import { Link } from "react-router-dom";
import "./Header.style.css";


function Header() {
  return (
    <header className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg fixed w-full z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-indigo-600">
          FutureCode
        </Link>
        <nav className="hidden md:flex space-x-8">
          {[
            {
              title: "Cursos",
            },
            {
              title: "IA Personalizada",
            },
            {
              title: "Recursos",
            },
            {
              title: "Blog",
            },
          ].map((item, key) => (
            <Link
              key={key}
              to="/courses"
              className="text-gray-600 hover:text-indigo-600 transition duration-300 cursor-pointer"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 hidden md:block"
        >
          Iniciar Aprendizaje
        </Link>
      </div>
    </header>
  );
}

export default Header;
