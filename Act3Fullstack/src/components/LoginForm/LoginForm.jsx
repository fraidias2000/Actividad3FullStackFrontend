import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import "./LoginForm.css";

export function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-field">
        <label>Correo Electrónico</label>

        <div className="login-input-wrapper">
          <Mail className="login-icon" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="ejemplo@correo.com"
          />
        </div>
      </div>

      <div className="login-field">
        <label>Contraseña</label>

        <div className="login-input-wrapper">
          <Lock className="login-icon" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
      </div>

      <button type="submit" className="login-button">
        Iniciar Sesión
        <ArrowRight className="login-button-icon" />
      </button>
    </form>
  );
}