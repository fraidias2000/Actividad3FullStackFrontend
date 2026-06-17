import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import "./Login.css";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectUrl =
    new URLSearchParams(location.search).get("redirect") || "/";

  const handleLogin = async ({ email, password }) => {
    if (!email || !password) return;

    try {
      setLoading(true);
      setError("");

      await login(email, password);

      navigate(redirectUrl);
    } catch (err) {
      console.error(err);
      setError(err.message || "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
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

        {error && <p className="login-error">{error}</p>}

        <LoginForm onSubmit={handleLogin} isLoading={loading} />

        <p className="login-help">
          Usa afraidias27@gmail.com / admin123
        </p>
      </motion.div>
    </div>
  );
}