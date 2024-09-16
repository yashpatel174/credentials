import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Private = ({ element: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);
  return auth ? Component : <Navigate to="/login" />;
};

export default Private;
