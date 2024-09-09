import "./styles/global.css";

// import HeroSection from "./components/landingPage/HeroSection";
// import FeaturesSection from "./components/landingPage/FeaturesSection";
// import LandingPage from './components/LandingPage'

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CoursesCatalog from "./pages/CoursesCatalog/CoursesCatalog";
// import CourseCreationPage from './pages/CourseCreationPage/CourseCreationPage';
import RoadmapPage from "./pages/RoadmapPage/RoadmapPage";
import RoadmapCreationPage from "./pages/RoadmapPage/RoadmapCreationPage";
// import SettingsPage from './pages/SettingsPage/SettingsPage';
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
// import Header from './components/Header/Header';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AdminPage from "./pages/adminPage/AdminPage";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            {/* Definimos las rutas correspondientes a cada página */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/courses" element={<CoursesCatalog />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole={1}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roadmap"
              element={
                <ProtectedRoute requiredRole={1}>
                  <RoadmapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/RoadmapCreator"
              element={
                <ProtectedRoute requiredRole={1}>
                  <RoadmapCreationPage />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/create-course" element={<CourseCreationPage />} /> */}
            {/* <Route path="/settings" element={<SettingsPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole={3}>
                  <AdminPage />
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
