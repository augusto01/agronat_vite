import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (username, password) => {
    // Aquí puedes agregar la lógica de autenticación, como una llamada a un servidor
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Aquí puedes agregar la lógica de cierre de sesión, como eliminar tokens
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
