// // import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// // import { useAuth } from "../../auth/AuthContext";
// import { useAuth } from "../../auth/useAuth";

// function AdminPage() {
//   const { userId, userName, userEmail, userRole, loading } = useAuth();

//   return (
//     <div className=" flex flex-col ">
//       <div className="flex flex-col">
//         <h2>User information</h2>
//         <span>ID: {userId}</span>
//         <span>Nombre: {userName}</span>
//         <span>Email: {userEmail} </span>
//         <span>Role: {userRole}</span>
//       </div>

//       {[
//         {
//           ruta: "/",
//         },
//         {
//           ruta: "/admin",
//         },
//         {
//           ruta: "/login",
//         },
//         {
//           ruta: "/signup",
//         },
//         {
//           ruta: "/dashboard",
//         },
//         {
//           ruta: "/courses",
//         },
//         {
//           ruta: "/roadmap",
//         },
//         {
//           ruta: "/RoadmapCreator",
//         },
//       ].map((item, key) => (
//         <Link
//           key={key}
//           to={item.ruta}
//           className=" bg-zinc-400 border-4 hover:bg-zinc-600 p-2 w-52"
//         >
//           {item.ruta}
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default AdminPage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  BarChart2,
  Settings,
  Plus,
  Search,
  Bell,
  ChevronDown,
  User,
  Star,
  Trash2,
  Edit,
  Download,
  LayoutDashboard,
  LibraryBig,
} from "lucide-react";
import Header from "../../components/Header/Header";

function DashboardContent({ stats, recentActivities, routesList }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="text-3xl font-semibold text-gray-900">
                      {item.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Actividad Reciente
            </h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-900">
              Ver todo
            </button>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="text-sm text-gray-900">
                  {activity.user} {activity.action}
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  {activity.course}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Acciones Rápidas
            </h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-5 w-5" aria-hidden="true" />
                Crear Nuevo Curso
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200">
                <Users className="mr-2 h-5 w-5" aria-hidden="true" />
                Gestionar Usuarios
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200">
                <Settings className="mr-2 h-5 w-5" aria-hidden="true" />
                Configuración de la Plataforma
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Site routes
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Site routes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routesList.map((ruta, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link to={ruta.ruta}>{ruta.ruta}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Cursos Más Populares
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre del Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estudiantes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calificación
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topCourses.map((course, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.students}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
}

function UsersContent() {
  const users = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      role: "Estudiante",
      courses: 3,
    },
    {
      id: 2,
      name: "María García",
      email: "maria@example.com",
      role: "Instructor",
      courses: 2,
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      role: "Estudiante",
      courses: 5,
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana@example.com",
      role: "Administrador",
      courses: 0,
    },
    {
      id: 5,
      name: "Luis Sánchez",
      email: "luis@example.com",
      role: "Estudiante",
      courses: 1,
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Gestión de Usuarios
        </h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
          Añadir Usuario
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cursos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.courses}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CoursesContent() {
  const courses = [
    {
      id: 1,
      name: "JavaScript Avanzado",
      instructor: "Juan Pérez",
      students: 120,
      rating: 4.8,
    },
    {
      id: 2,
      name: "React para Principiantes",
      instructor: "María García",
      students: 85,
      rating: 4.6,
    },
    {
      id: 3,
      name: "Node.js Intermedio",
      instructor: "Carlos Rodríguez",
      students: 95,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Python para Data Science",
      instructor: "Ana Martínez",
      students: 150,
      rating: 4.9,
    },
    {
      id: 5,
      name: "Desarrollo Web Full Stack",
      instructor: "Luis Sánchez",
      students: 110,
      rating: 4.5,
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Gestión de Cursos</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
          Crear Nuevo Curso
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre del Curso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instructor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estudiantes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Calificación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {course.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.instructor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.rating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsContent() {
  const monthlyData = [
    { month: "Ene", users: 1000, revenue: 5000 },
    { month: "Feb", users: 1200, revenue: 6000 },
    { month: "Mar", users: 1500, revenue: 7500 },
    { month: "Abr", users: 1800, revenue: 9000 },
    { month: "May", users: 2100, revenue: 10500 },
    { month: "Jun", users: 2400, revenue: 12000 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Resumen de Analíticas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Crecimiento de Usuarios
            </h3>
            <div className="bg-indigo-100 p-4 rounded-lg">
              <p className="text-3xl font-bold text-indigo-600">+24%</p>
              <p className="text-sm text-indigo-800">
                Comparado con el mes anterior
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Ingresos Mensuales
            </h3>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-3xl font-bold text-green-600">$12,000</p>
              <p className="text-sm text-green-800">
                +15% respecto al mes anterior
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Datos Mensuales
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nuevos Usuarios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ingresos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.users}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${data.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Acciones</h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <Download className="mr-2 h-5 w-5" aria-hidden="true" />
            Descargar Reporte Completo
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200">
            <BarChart2 className="mr-2 h-5 w-5" aria-hidden="true" />
            Ver Análisis Detallado
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    { name: "Usuarios Totales", value: "32", icon: Users },
    { name: "Cursos Totales", value: "48", icon: BookOpen },
    { name: "RoadMaps IA", value: "5", icon: BookOpen },
    // { name: "Tasa de Finalización", value: "76%", icon: ChevronDown },
  ];

  const recentActivities = [
    {
      user: "Jhon doe",
      action: "Lorem ipsum dolor sit",
      course: "Lorem ipsum dolor sit amet",
    },
    {
      user: "Jhon doe",
      action: "Lorem ipsum dolor sit",
      course: "Lorem ipsum dolor sit amet",
    },
    {
      user: "Jhon doe",
      action: "Lorem ipsum dolor sit",
      course: "Lorem ipsum dolor sit amet",
    },
    {
      user: "Jhon doeS",
      action: "Lorem ipsum dolor sit",
      course: "Lorem ipsum dolor sit amet",
    },
    {
      user: "Jhon doe",
      action: "Lorem ipsum dolor sit",
      course: "Lorem ipsum dolor sit amet",
    },
  ];

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

  const topCourses = [
    { name: "JavaScript Avanzado", students: 1234, rating: 4.8 },
    { name: "React para Principiantes", students: 987, rating: 4.7 },
    { name: "Python para Data Science", students: 876, rating: 4.9 },
    { name: "Node.js Intermedio", students: 765, rating: 4.6 },
    { name: "Desarrollo Web Full Stack", students: 654, rating: 4.8 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            AILearnPro Admin
          </Link>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Search className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header> */}
      <Header />
      <div className="flex max-w-7xl mx-auto px-6">
        <nav className="bg-white shadow w-64 h-screen pt-20">
          <div className="px-4 py-5">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "dashboard"
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
                  onClick={() => setActiveTab("users")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "users"
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
                  onClick={() => setActiveTab("courses")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "courses"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <LibraryBig className="w-5 h-5 mr-2" />
                  Cursos
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    activeTab === "analytics"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Analíticas
                </button>
              </li> */}
            </ul>
          </div>
        </nav>

        <main className="flex-1 pl-8 pt-24">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Panel de Administración
          </h1>

          {activeTab === "dashboard" && (
            <DashboardContent
              stats={stats}
              recentActivities={recentActivities}
              // topCourses={topCourses}
              routesList={routesList}
            />
          )}
          {activeTab === "users" && <UsersContent />}
          {/* {activeTab === "courses" && <CoursesContent />} */}
          {/* {activeTab === "analytics" && <AnalyticsContent />} */}
        </main>
      </div>
    </div>
  );
}
