import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Private = ({ element: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);
  return auth ? Component : <Navigate to="/login" />;
};

export default Private;
