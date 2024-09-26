import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  User,
  Settings,
  DollarSign,
  LogOut,
  CircleUserRound,
} from "lucide-react";
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

  const selectColor = () => {
    const numRandom = Math.floor(Math.random() * 10);

    const avatar = ["", "", "", "", ""];

    // switch (numRandon) {
    //   case 0:
    //     return '';
    //   case 1:
    //     return ''

    //   case 2:
    //     return ''

    //   case 3:
    //     return ''

    //   case 4:
    //     return ''
    // }
  };

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm w-44 pe-1 font-medium text-gray-900 rounded-full hover:text-indigo-600 focus:ring-4 focus:ring-gray-100 hover:ring-gray-100 hover:ring-2 h-9"
        type="button"
      >
        <span className="sr-only">Abrir menu de usuario</span>
        {/* <CircleUserRound
          className="w-14 h-14 me-2 rounded-full"
          color="#707070"
          strokeWidth={1}
          alt="foto de usuario"
        /> */}
        <img
          className="w-8 h-8 me-2 rounded-full"
          src="https://avatar.iran.liara.run/public"
          alt="foto de usuario"
        />
        <span className="w-full text-center">{userName}</span>
        <ChevronDown className="w-4 h-4 ms-3 mr-2 " />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow ">
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
