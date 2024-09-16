import React, { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    return sessionStorage.getItem("token") ? { token: sessionStorage.getItem("token") } : null;
  });

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setAuth({ token });
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setAuth(null);
  };
  return (
    <>
      <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
