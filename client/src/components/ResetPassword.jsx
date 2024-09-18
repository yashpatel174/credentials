import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Fill the required fields.");
      return;
    }

    if (password !== confirmPassword) {
      return toast.error("Password does not match");
    }

    try {
      const url = `http://localhost:8080/user/reset-password/${encodeURIComponent(token)}`;

      const response = await axios.post(url, {
        token,
        newPassword: password,
        confirmPassword,
      });

      toast.error(response.message);
      navigate("/login");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
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
                  Reset Password
                </h1>
                <form>
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
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="conformPassword"
                      className="form-label text-black"
                    >
                      Conform Password
                    </label>
                    <input
                      type="password"
                      className="form-control bg-white text-black custom-focus"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-center d-flex">
                    <button
                      onClick={handleReset}
                      type="submit"
                      className="btn btn-warning w-100 bg-black text-white border-2 border-white"
                    >
                      Reset
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

export default ResetPassword;
