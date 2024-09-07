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
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const { user, role, loading } = useAuth();

  // Evitar renderizar hasta que el estado de autenticación esté disponible
  if (loading) {
    return null; // No renderizar nada hasta que el usuario esté autenticado o no
  }

  return (
    <Router>
      <div>
        {/* Header será visible en todas las páginas */}
        {/* <Header /> */}

        <Routes>
          {/* Definimos las rutas correspondientes a cada página */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user} role={role} requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/courses" element={<CoursesCatalog />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/RoadmapCreator" element={<RoadmapCreationPage />} />
          {/* <Route path="/create-course" element={<CourseCreationPage />} /> */}
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="/admin" element={<AllRoutes />} /> */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} role={role} requiredRole="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Footer será visible en todas las páginas */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
