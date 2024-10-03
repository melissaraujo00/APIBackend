import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center my-48">
          <AlertTriangle className="mx-auto h-16 w-16 text-indigo-600" />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Page Not Found
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Lo sentimos, no hemos podido encontrar la página que buscas.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Home className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
              Ir al inicio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
