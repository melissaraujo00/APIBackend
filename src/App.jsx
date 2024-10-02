import "./styles/global.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CoursesCatalog from "./pages/Courses/CoursesCatalog";

import RoadmapPage from "./pages/RoadmapPage/RoadmapPage";
import RoadmapCreationPage from "./pages/RoadmapPage/RoadmapCreationPage";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

import UserDashboard from "./pages/Dashboards/UserDashboard/UserDashboard";
import AdminDashboard from "./pages/Dashboards/adminDashboard/AdminDashboard";
import TeacherDashboard from "./pages/Dashboards/TeacherDashboard/TeacherDashboard";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CreateNewCourse from "./pages/Courses/CreateNewCourse";
import CourseView from "./pages/Courses/CourseView";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            {/* Definimos las rutas correspondientes a cada página */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute allowedRoles={[null]}>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute allowedRoles={[null]}>
                  <SignUpPage />
                </ProtectedRoute>
              }
            />
            <Route path="/courses" element={<CoursesCatalog />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roadmap/:id"
              element={
                <ProtectedRoute allowedRoles={["user", "profesor", "admin"]}>
                  <RoadmapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/RoadmapCreator"
              element={
                <ProtectedRoute allowedRoles={["user", "profesor", "admin"]}>
                  <RoadmapCreationPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* IN DEVELOPMENT */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["profesor", "admin"]}>
                  


                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={["profesor", "admin"]}>
                  {/* <TeacherDashboard /> */}
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/newcourse"
              element={
                <ProtectedRoute allowedRoles={["profesor", "admin"]}>
                  <CreateNewCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewcourse/:id"
              element={
                <ProtectedRoute allowedRoles={["user","profesor", "admin"]}>
                  <CourseView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
