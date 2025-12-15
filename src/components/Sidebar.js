import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ setLoggedIn }) {
  const nav = useNavigate();
  const logout = () => {
    if (setLoggedIn) setLoggedIn(false);
    nav("/");
  };

  return (
    <div className="bg-dark text-white p-3 rounded">
      <nav className="nav flex-column">
        <NavLink to="/dashboard" className="nav-link text-white">🏠 Tableau de bord</NavLink>
        <NavLink to="/dashboard/ajouter" className="nav-link text-white">➕ Ajouter Article</NavLink>
        <NavLink to="/dashboard/gestion" className="nav-link text-white">⚙️ Gérer Articles</NavLink>
        <button className="btn btn-outline-light mt-3" onClick={logout}>Se déconnecter</button>
      </nav>
    </div>
  );
}
