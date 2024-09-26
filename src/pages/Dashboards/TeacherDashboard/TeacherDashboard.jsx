import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, ClipboardList, BarChart2, Search, Bell, Plus, Edit, Trash2, Download, Star, CheckCircle, XCircle } from 'lucide-react'
// import UserDropdown from './UserDropdown'

function DashboardContent({ stats, recentActivities, upcomingAssignments }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{item.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Actividad Reciente</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-900">Ver todo</button>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="text-sm text-gray-900">{activity.student} {activity.action}</div>
                <div className="mt-1 text-sm text-gray-600">{activity.course}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Próximas Tareas</h2>
            <ul className="divide-y divide-gray-200">
              {upcomingAssignments.map((assignment, index) => (
                <li key={index} className="py-4 flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{assignment.title}</p>
                    <p className="text-gray-600">{assignment.course}</p>
                  </div>
                  <div className="text-sm text-gray-500">{assignment.dueDate}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

function CoursesContent() {
  const courses = [
    { id: 1, name: 'JavaScript Avanzado', students: 120, progress: 75 },
    { id: 2, name: 'React para Principiantes', students: 85, progress: 60 },
    { id: 3, name: 'Node.js Intermedio', students: 95, progress: 80 },
    { id: 4, name: 'Python para Data Science', students: 150, progress: 50 },
    { id: 5, name: 'Desarrollo Web Full Stack', students: 110, progress: 70 },
  ]

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Mis Cursos</h2>
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
                Estudiantes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progreso
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
                  {course.students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <span className="text-xs ml-2">{course.progress}%</span>
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
  )
}

function StudentsContent() {
  const students = [
    { id: 1, name: 'Ana García', email: 'ana@example.com', course: 'JavaScript Avanzado', progress: 80 },
    { id: 2, name: 'Carlos Rodríguez', email: 'carlos@example.com', course: 'React para Principiantes', progress: 65 },
    { id: 3, name: 'María López', email: 'maria@example.com', course: 'Node.js Intermedio', progress: 90 },
    { id: 4, name: 'Juan Martínez', email: 'juan@example.com', course: 'Python para Data Science', progress: 75 },
    { id: 5, name: 'Laura Sánchez', email: 'laura@example.com', course: 'Desarrollo Web Full Stack', progress: 85 },
  ]

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Mis Estudiantes</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Buscar estudiante..."
            className="border rounded-md px-3 py-2 text-sm"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
            Buscar
          </button>
        </div>
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
                Curso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progreso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                  </div>
                  <span className="text-xs ml-2">{student.progress}%</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AssignmentsContent() {
  const assignments = [
    { id: 1, title: 'Proyecto Final JavaScript', course: 'JavaScript Avanzado', dueDate: '2023-07-15', status: 'Pendiente' },
    { id: 2, title: 'Componentes en React', course: 'React para Principiantes', dueDate: '2023-07-10', status: 'Revisado' },
    { id: 3, title: 'API RESTful con Node.js', course: 'Node.js Intermedio', dueDate: '2023-07-20', status: 'Pendiente' },
    { id: 4, title: 'Análisis de Datos con Pandas', course: 'Python para Data Science', dueDate: '2023-07-18', status: 'En Revisión' },
    { id: 5, title: 'Aplicación Web Completa', course: 'Desarrollo Web Full Stack', dueDate: '2023-07-25', status: 'Pendiente' },
  ]

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Tareas y Proyectos</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
          Crear Nueva Tarea
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Curso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Entrega
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {assignment.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {assignment.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {assignment.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    assignment.status ===  'Revisado' ? 'bg-green-100 text-green-800' :
                    assignment.status === 'En Revisión' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {assignment.status}
                  </span>
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
  )
}

function AnalyticsContent() {
  const coursePerformance = [
    { course: 'JavaScript Avanzado', students: 120, avgProgress: 75, avgScore: 85 },
    { course: 'React para Principiantes', students: 85, avgProgress: 60, avgScore: 78 },
    { course: 'Node.js Intermedio', students: 95, avgProgress: 80, avgScore: 88 },
    { course: 'Python para Data Science', students: 150, avgProgress: 50, avgScore: 72 },
    { course: 'Desarrollo Web Full Stack', students: 110, avgProgress: 70, avgScore: 82 },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen de Rendimiento</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-800 mb-2">Tasa de Finalización</h3>
            <p className="text-3xl font-bold text-green-600">78%</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Promedio de Calificaciones</h3>
            <p className="text-3xl font-bold text-blue-600">85/100</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-800 mb-2">Estudiantes Activos</h3>
            <p className="text-3xl font-bold text-purple-600">560</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Rendimiento por Curso</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Curso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiantes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progreso Promedio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calificación Promedio
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coursePerformance.map((course, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.students}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${course.avgProgress}%` }}></div>
                    </div>
                    <span className="text-xs ml-2">{course.avgProgress}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.avgScore}/100
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
  )
}

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { name: 'Cursos Activos', value: '5', icon: BookOpen },
    { name: 'Total Estudiantes', value: '423', icon: Users },
    { name: 'Tareas Pendientes', value: '12', icon: ClipboardList },
    { name: 'Calificación Promedio', value: '4.8', icon: Star },
  ]

  const recentActivities = [
    { student: 'Maria García', action: 'completó', course: 'JavaScript Avanzado' },
    { student: 'Juan Pérez', action: 'se unió a', course: 'React para Principiantes' },
    { student: 'Ana Martínez', action: 'entregó tarea en', course: 'Node.js Intermedio' },
    { student: 'Carlos Rodríguez', action: 'inició', course: 'Python para Data Science' },
    { student: 'Laura Sánchez', action: 'obtuvo certificado de', course: 'Desarrollo Web Full Stack' },
  ]

  const upcomingAssignments = [
    { title: 'Proyecto Final', course: 'JavaScript Avanzado', dueDate: '15 Jul' },
    { title: 'Componentes React', course: 'React para Principiantes', dueDate: '20 Jul' },
    { title: 'API RESTful', course: 'Node.js Intermedio', dueDate: '25 Jul' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            AILearnPro Profesor
          </Link>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Search className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
            {/* <UserDropdown /> */}
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="bg-white shadow w-64 h-screen">
          <div className="px-4 py-5">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'courses' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Mis Cursos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'students' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Estudiantes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'assignments' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Tareas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === 'analytics' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Analíticas
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel del Profesor</h1>

          {activeTab === 'dashboard' && (
            <DashboardContent stats={stats} recentActivities={recentActivities} upcomingAssignments={upcomingAssignments} />
          )}
          {activeTab === 'courses' && <CoursesContent />}
          {activeTab === 'students' && <StudentsContent />}
          {activeTab === 'assignments' && <AssignmentsContent />}
          {activeTab === 'analytics' && <AnalyticsContent />}
        </main>
      </div>
    </div>
  )
}