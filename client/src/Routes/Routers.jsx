import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../components/HomePage";
import Dashboard from "../components/Dashboard";
import Private from "../components/Private";
import AuthProvider from "../components/AuthProvider";

const Routers = () => {
  return (
    <AuthProvider>
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
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/dashboard"
            element={<Private element={<Dashboard />} />}
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default Routers;
