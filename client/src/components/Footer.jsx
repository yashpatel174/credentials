import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Footer = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const login = location.pathname === "/login";
  const register = location.pathname === "/register";

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <>
      <div
        className="w-full bg-black text-white d-flex justify-content-between align-items-center"
        style={{ height: "50px" }}
      >
        <div className="w-75 d-flex justify-content-between align-items-center m-auto text-white">
          <div className="fs-2">
            {" "}
            <i> Yash</i>
          </div>
          <div className="inline-block">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white text-decoration-none"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Logout
              </button>
            ) : (
              <>
                {login && (
                  <Link
                    to="/register"
                    className="text-white text-decoration-none"
                  >
                    Register
                  </Link>
                )}
                {register && (
                  <Link
                    to="/login"
                    className="text-white text-decoration-none ms-3"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="gradient-border"></div>
    </>
  );
};

export default Footer;
