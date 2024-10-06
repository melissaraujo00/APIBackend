import React from "react";
import { Users, LayoutDashboard, LibraryBig } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useAuth } from "../../../auth/useAuth";

export default function AdminPage() {
  const { userRole } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex max-w-7xl mx-auto px-6 mb-10">
        <nav className="bg-white shadow w-64 h-screen pt-20">
          <div className="px-4 py-5">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    location.pathname == "/admin" ||
                    location.pathname == "/admin/"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    location.pathname.includes("users")
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Usuarios
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/roadmaps"
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    location.pathname.includes("roadmaps")
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <LibraryBig className="w-5 h-5 mr-2" />
                  Roadmaps
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="flex-1 pl-8 pt-24">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Panel de {userRole == "admin" ? "Administración" : "Profesor"}
          </h1>

          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
