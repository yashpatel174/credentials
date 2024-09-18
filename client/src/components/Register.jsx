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

    try {
      const response = await axios.post("http://localhost:8080/user/register", { email, password });
      toast.success(response.data.message);
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
                    Register
                  </h1>
                  <form onSubmit={handleRegister}>
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
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className=" text-decoration-none"
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
