import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminPage() {
  const [UserName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className=" flex flex-col ">
      <div className="flex flex-col">
        <h2>User information</h2>
        <span>Nombre: {UserName}</span>
        <span>Email: {UserEmail}</span>
        <span>Role: {UserRole}</span>
        <br />
        <h1>{message}</h1>
      </div>

      <Link
        to={"/"}
        className=" bg-zinc-400 border-4 hover:bg-zinc-600 p-2 w-52"
      >
        / Homepage
      </Link>
      <Link
        to={"/login"}
        className=" bg-zinc-400 border-4 hover:bg-zinc-600 p-2 w-52"
      >
        /login{" "}
      </Link>
      <Link
        to={"/signup"}
        className=" bg-zinc-400 border-4 hover:bg-zinc-600 p-2 w-52"
      >
        /signup
      </Link>
      <Link
        to={"/dashboard"}
        className=" bg-zinc-400 border-4 hover:bg-zinc-600 p-2 w-52"
      >
        /dashboard
      </Link>
      <Link
        to={"/courses"}
        className=" bg-zinc-400 border-4 hover:bg-zinc-600 p-2 w-52"
      >
        /courses
      </Link>
      <Link
        to={"/roadmap"}
        className=" bg-zinc-400 border-4 hover:bg-zinc-600 p-2 w-52"
      >
        /roadmap
      </Link>
      <Link
        to={"/RoadmapCreator"}
        className=" bg-zinc-400 border-4 hover:bg-zinc-600 p-2 w-52"
      >
        /RoadmapCreationPage
      </Link>
    </div>
  );
}

export default AdminPage;
