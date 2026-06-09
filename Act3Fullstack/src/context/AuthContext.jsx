import { createContext, useContext, useState } from "react";
import ImageGenericUser from "../assets/imagen_usuario_generico.png";

/**Crea el contexto de autenticacion del usuario */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  /**Guarda los datos introducidos por el usuario */
  const login = (email, password) => {
    const loggedUser = {
      email: email,
      name: email.split("@")[0],
      avatar: ImageGenericUser,
    };

    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
}