import React, { useEffect, useState } from "react";
import { Users, BookOpen, LayoutDashboard, LibraryBig } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { GetAllUsers } from "../../../components/Api/UserRoutes";
import {
  GetAllModules,
  GetUserModules,
} from "../../../components/Api/ModulesRoutes";
import { LoadingScreen } from "../../../components/LoadingScreen";
import MainContent from "./MainContent";
import UsersContent from "./UsersContent";
import RoadmapContent from "./RoadmapsContent";
import { useAuth } from "../../../auth/useAuth";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");
  const [isLoading, setisLoading] = useState("LOADING");
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);
  const [courses, setCourses] = useState([]);
  const { userRole } = useAuth();
  const location = useLocation();

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

      if (userRole == "profesor") {
        console.log(userRole == "profesor");
        // PARA USUARIO PROFESOR
        try {
          const coursesUsersResponse = await GetUserModules();

          if (coursesUsersResponse.status == 200) {
            const coursesdata = coursesUsersResponse.data;
            setCourses(coursesdata.reverse());
          }
        } catch (error) {
          console.log("errorGetUserModules: ", error);
        }
      } else {
        //PARA USAURIO ADMIN
        try {
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
        } catch (error) {
          console.log("error", error);
        }
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
                <Link
                  to="/admin/dashboard"
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    location.pathname.includes("dashboard")
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

          {isLoading == "LOADING" ? (
            <LoadingScreen />
          ) : (
            <Outlet
              context={{
                userRole,
                stats,
                routesList,
                courses,
                users,
              }}
            />
          )}
          {/* (
            <>
              {activeTab === "DASHBOARD" && (
                <MainContent
                  userRole={userRole}
                  stats={stats}
                  routesList={routesList}
                  coursesModules={courses}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === "USERS" && (
                <UsersContent userRole={userRole} usersList={users} />
              )}
              {activeTab === "ROADMAPS" && <RoadmapContent />}
            </>
          )} */}
        </main>
      </div>
      <Footer />
    </div>
  );
}
