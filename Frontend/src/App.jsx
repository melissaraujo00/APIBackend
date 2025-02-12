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
import MainContent from "./pages/Dashboards/adminDashboard/MainContent";
import UsersContent from "./pages/Dashboards/adminDashboard/UsersContent";
import RoadmapContent from "./pages/Dashboards/adminDashboard/RoadmapsContent";

import TeacherDashboard from "./pages/Dashboards/TeacherDashboard/TeacherDashboard";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CreateNewCourse from "./pages/Courses/CreateNewCourse";
import CourseView from "./pages/Courses/CourseView";
import Dashborads from "./pages/Dashboards/Dashborads";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
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
                <ProtectedRoute allowedRoles={["user", "profesor", "admin"]}>
                  <CourseView />
                </ProtectedRoute>
              }
            />

            <Route path="/dashboards" element={<Dashborads />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["profesor", "admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="" element={<MainContent />} />
              <Route path="users" element={<UsersContent />} />
              <Route path="roadmaps" element={<RoadmapContent />} />
            </Route>

            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={["profesor", "admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="" element={<MainContent />} />
              <Route path="users" element={<UsersContent />} />
              <Route path="roadmaps" element={<RoadmapContent />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
