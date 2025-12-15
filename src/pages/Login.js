import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === "admin" && password === "1234") {
      onLogin(true);
      nav("/dashboard");
    } else {
      alert("Identifiants incorrects");
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4>🔒 Connexion Admin</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input className="form-control" placeholder="Utilisateur" value={user} onChange={(e)=>setUser(e.target.value)} />
        </div>
        <div className="mb-2">
          <input className="form-control" type="password" placeholder="Mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Se connecter</button>
      </form>
    </div>
  );
}
