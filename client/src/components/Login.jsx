import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    if (!email.trim() && !password.trim()) {
      return toast.error("Email & password are required!");
    }
    if (!email.trim()) {
      return toast.error("Email is required!");
    }
    if (email && !validateEmail(email)) {
      return toast.error("Invalid email id!");
    }
    if (!password.trim()) {
      return toast.error("Password is required!");
    }

    try {
      const response = await axios.post("http://localhost:8080/user/login", { email, password });

      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        login(token);
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "An error occurred!");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred!";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Enter your email id!");
    }

    try {
      const response = await axios.post("http://localhost:8080/user/forgot-password", { email });

      if (response.data && response.data.message) {
        toast.success(response.data.message.message);
      } else {
        toast.error("An error occurred while sending the reset email.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "An error occurred!";
        toast.error(errorMessage);
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  return (
    <div
      className="bg-black text-white d-flex justify-content-center align-items-center"
      style={{ height: "86vh" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-4">
            <div
              className="card text-black border-0 shadow-lg"
              style={{ backgroundColor: "#ff803e" }}
            >
              <div className="card-body">
                <h1
                  className="text-center mb-4"
                  style={{ color: "#000", fontSize: "2rem" }}
                >
                  Login
                </h1>
                <form
                  onSubmit={handleLogin}
                  noValidate
                >
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label text-black"
                      style={{ fontSize: "1rem" }}
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control bg-white text-black"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label text-black"
                      style={{ fontSize: "1rem" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control bg-white text-black"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p
                      className="text-black text-start text-sm-end"
                      style={{ marginTop: "5px", fontSize: "0.875rem" }}
                    >
                      Don't you have an account?{" "}
                      <Link
                        to="/register"
                        className="text-decoration-none"
                      >
                        Register
                      </Link>{" "}
                    </p>
                  </div>
                  <div className="text-center d-flex flex-column flex-sm-row">
                    <button
                      type="submit"
                      className="btn btn-warning w-100 bg-black text-white border-2 border-white mb-2 mb-sm-0"
                      style={{ fontSize: "1rem" }}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="btn btn-warning w-100 bg-black text-white border-2 border-white mt-2 mt-sm-0 ms-sm-2"
                      style={{ fontSize: "1rem" }}
                    >
                      Forgot password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
