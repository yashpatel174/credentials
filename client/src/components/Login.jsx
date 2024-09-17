import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/user/login", { email, password });
      if (!response) return alert.error("Enter the credentials.");
      if (response && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        login(token);
        toast.success(response.message);
        navigate("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        alert(response.message);
        return;
      }
      const response = await axios.post("http://localhost:8080/user/forgot-password", { email });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-black text-white d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div
              className="card text-black border-0 shadow-lg"
              style={{ backgroundColor: "#ff803e" }}
            >
              <div className="card-body">
                <h1
                  className="text-center mb-4"
                  style={{ color: "#000" }}
                >
                  Login
                </h1>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label text-black"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control bg-white text-black custom-focus"
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
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control bg-white text-black custom-focus"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p
                      className="text-black text-end"
                      style={{ marginTop: "5px" }}
                    >
                      Don't you have account?{" "}
                      <Link
                        to="/register"
                        className=" text-decoration-none"
                      >
                        Register
                      </Link>{" "}
                    </p>
                  </div>
                  <div className="text-center d-flex">
                    <button
                      type="submit"
                      className="btn btn-warning w-100 bg-black text-white border-2 border-white"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="btn btn-warning w-100 bg-black text-white border-2 border-white"
                      style={{ marginLeft: "20px" }}
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
