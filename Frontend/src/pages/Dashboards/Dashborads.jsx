import React, { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { Navigate } from "react-router-dom";

export default function Dashborads() {
  const { userId, userName, userRole, loading } = useAuth();

  if (!loading) {
    switch (userRole) {
      case "admin":
        return <Navigate to="/admin" />;
        break;
      case "profesor":
        return <Navigate to="/teacher" />;
        break;
      default:
        return <Navigate to="/dashboard" />;
        break;
    }
  }
}
