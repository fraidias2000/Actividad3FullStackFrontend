import { createContext, useContext, useState } from "react";
import ImageGenericUser from "../assets/imagen_usuario_generico.png";
import { loginUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  const login = async (email, password) => {
    const authData = await loginUser(email, password);

    console.log("Respuesta login:", authData);

    const opaqueToken =
      authData.opaqueToken ||
      authData.accessToken ||
      authData.token ||
      authData.access_token;

    if (!opaqueToken) {
      throw new Error("El backend no ha devuelto token opaco.");
    }

    const loggedUser = {
      id: authData.userId ?? authData.id,
      email: authData.email,
      firstName: authData.firstName,
      lastName: authData.lastName,
      name: `${authData.firstName ?? ""} ${authData.lastName ?? ""}`,
      roles: authData.roles,
      avatar: ImageGenericUser,
      opaqueToken,
      refreshToken: authData.refreshToken,
    };

    setUser(loggedUser);

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("opaqueToken", opaqueToken);
    localStorage.setItem("refreshToken", authData.refreshToken);

    return loggedUser;
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("opaqueToken");
    localStorage.removeItem("refreshToken");
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