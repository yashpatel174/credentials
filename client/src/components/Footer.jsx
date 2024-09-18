import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Footer = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const login = location.pathname === "/login";
  const register = location.pathname === "/register";
  const homePage = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  // eslint-disable-next-line
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <>
      <div
        className="w-full bg-black text-white d-flex justify-content-between align-items-center"
        style={{ height: "50px" }}
      >
        {/* Desktop View */}
        <div className="d-none d-md-flex w-75 justify-content-between align-items-center m-auto text-white">
          <Link
            to="/"
            className="fs-2 text-white text-decoration-none"
          >
            <i> Yash</i>
          </Link>
          <div className="d-flex align-items-center">
            {homePage ? (
              <>
                <Link
                  to="/login"
                  className="text-white text-decoration-none"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white text-decoration-none ms-3"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
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
