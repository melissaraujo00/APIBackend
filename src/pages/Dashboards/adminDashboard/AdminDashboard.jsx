import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, BookOpen, LayoutDashboard, LibraryBig } from "lucide-react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { GetAllUsers } from "../../../components/Api/UserRoutes";
import { GetAllModules } from "../../../components/Api/ModulesRoutes";
import { LoadingScreen } from "../../../components/LoadingScreen";
import MainContent from "./MainContent";
import UsersContent from "./UsersContent";
import RoadmapContent from "./RoadmapsContent";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");
  const [isLoading, setisLoading] = useState("LOADING");
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setStats([]);

    const GetData = async () => {
      const usersResponse = await GetAllUsers();
      if (usersResponse.status == 200) {
        const usersdata = usersResponse.data;
        setUsers(usersdata.reverse());

        const usersLength = usersResponse.data.length;

        setStats((prev) => [
          ...prev,
          {
            name: "Usuarios Totales",
            value: usersLength,
            icon: Users,
          },
        ]);
      }

      const coursesResponse = await GetAllModules();
      if (coursesResponse.status == 200) {
        const coursesdata = coursesResponse.data;
        setCourses(coursesdata.reverse());

        let modulesCount = 0;
        for (let i = 0; i < coursesResponse.data.length; i++) {
          modulesCount += coursesResponse.data[i].temas.length;
        }
        setStats((prev) => [
          ...prev,
          {
            name: "Cursos Totales",
            value: modulesCount,
            icon: BookOpen,
          },
        ]);
      }

      setisLoading("SUCCESSFUL");
    };
    GetData();
  }, []);

  const routesList = [
    { ruta: "/" },
    { ruta: "/admin" },
    { ruta: "/login" },
    { ruta: "/signup" },
    { ruta: "/dashboard" },
    { ruta: "/courses" },
    { ruta: "/roadmap" },
    { ruta: "/RoadmapCreator" },
    { ruta: "/NotFoundPage" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex max-w-7xl mx-auto px-6 mb-10">
        <nav className="bg-white shadow w-64 h-screen pt-20">
          <div className="px-4 py-5">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("DASHBOARD")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "DASHBOARD"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("USERS")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "USERS"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Usuarios
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("ROADMAPS")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "ROADMAPS"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <LibraryBig className="w-5 h-5 mr-2" />
                  roadmaps
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <main className="flex-1 pl-8 pt-24">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Panel de Administración
          </h1>

          {isLoading == "LOADING" ? (
            <LoadingScreen />
          ) : (
            <>
              {activeTab === "DASHBOARD" && (
                <MainContent
                  stats={stats}
                  routesList={routesList}
                  coursesModules={courses}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === "USERS" && <UsersContent usersList={users} />}
              {activeTab === "ROADMAPS" && <RoadmapContent />}
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
