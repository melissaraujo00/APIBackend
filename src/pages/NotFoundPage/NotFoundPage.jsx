import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      {/* <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            FutureCode
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/courses"
              className="text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              Courses
            </Link>
            <Link
              to="/ai-personalization"
              className="text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              AI Personalization
            </Link>
            <Link
              to="/resources"
              className="text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              Resources
            </Link>
          </nav>
        </div>
      </header> */}
        <Header/>
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center my-48">
          <AlertTriangle className="mx-auto h-16 w-16 text-indigo-600" />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Page Not Found
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Home className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
              Go back home
            </Link>
          </div>
        </div>
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
