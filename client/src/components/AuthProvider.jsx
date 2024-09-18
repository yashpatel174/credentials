import React, { useState, createContext } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    return sessionStorage.getItem("token") ? { token: sessionStorage.getItem("token") } : null;
  });

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setAuth({ token });
  };

  const logout = (req, res) => {
    sessionStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setAuth(null);
  };
  return (
    <>
      <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
