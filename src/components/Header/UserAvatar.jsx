import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Settings, DollarSign, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../auth/AuthContext";
import { useAuth } from "../../auth/useAuth";
import { logoutUser } from "../../auth/authService";

export default function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDashboard, setuserDashboard] = useState("");
  const dropdownRef = useRef(null);
  const {
    userId,
    userName,
    userEmail,
    userRole,
    loading,
    checkAuthentication,
  } = useAuth();
  const navigate = useNavigate();

  async function LogOutAction() {
    const response = await logoutUser();

    if (response.status == 200) {
      await checkAuthentication();
      navigate("/");
    } else {
      alert("algo salio mal");
    }
  }
  useEffect(() => {
    switch (userRole) {
      case "user":
        setuserDashboard("/dashboard");
        break;

      case "profesor":
        setuserDashboard("/teacher");
        break;

      case "admin":
        setuserDashboard("/admin");
        break;
    }
  }, []);

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm w-48 pe-1 font-medium text-gray-900 rounded-full hover:text-indigo-600 focus:ring-4 focus:ring-gray-100 hover:ring-gray-100 hover:ring-2 h-9"
        type="button"
      >
        <span className="sr-only">Abrir menu de usuario</span>
        <img
          className="w-8 h-8 me-2 rounded-full"
          src="\src\assets\placeholderUserAvatarjpeg.jpeg"
          alt="foto de usuario"
        />
        <span className="w-full text-left">{userName}</span>
        <ChevronDown className="w-4 h-4 ms-3 mr-2 " />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow ">
          <div className="px-4 py-3 text-sm text-gray-900 ">
            <div className="font-medium">{userName}</div>
            <div className="truncate">{userEmail}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 ">
            <li>
              <Link
                to={userDashboard}
                className="flex items-center px-4 py-2 hover:bg-gray-100 "
              >
                <User className="w-4 h-4 mr-2" />
                Panel de Control
              </Link>
            </li>
            {/* <li>
              <Link
                to="#"
                className="flex items-center px-4 py-2 hover:bg-gray-100 "
              >
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Link>
            </li> */}
          </ul>
          <div className="py-2">
            <button
              onClick={() => {
                LogOutAction();
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
