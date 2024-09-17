import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../components/HomePage";
import Dashboard from "../components/Dashboard";
import Private from "../components/Private";
import AuthProvider from "../components/AuthProvider";
import ResetPassword from "../components/ResetPassword";
import Stars from "../components/Stars";
import NoPage from "../components/NoPage";

const Routers = () => {
  return (
    <AuthProvider>
      {/* <Stars /> */}
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/dashboard"
            element={<Private element={<Dashboard />} />}
          />
          <Route
            path="*"
            element={<NoPage />}
          />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
};

export default Routers;
