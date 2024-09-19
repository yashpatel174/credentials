import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
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
      const response = await axios.post("http://localhost:8080/user/register", { email, password });
      toast.success(response.data.message.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };
  return (
    <>
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
                    Register
                  </h1>
                  <form
                    onSubmit={handleRegister}
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
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="text-decoration-none"
                        >
                          Login
                        </Link>{" "}
                      </p>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-warning w-100 bg-black text-white border-2 border-white"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
