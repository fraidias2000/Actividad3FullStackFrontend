import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { LoginForm } from "../LoginForm/LoginForm";
import "./Login.css";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectUrl =
    new URLSearchParams(location.search).get("redirect") || "/";

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;

    login(email, password);
    navigate(redirectUrl);
  };

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <div className="login-header">
          <h1>Bienvenido</h1>
          <p>Inicia sesión para continuar con tu compra</p>
        </div>

        <LoginForm onSubmit={handleLogin} />

        <p className="login-help">
          Para este prototipo, usa cualquier correo y contraseña.
        </p>
      </motion.div>
    </div>
  );
}