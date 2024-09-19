import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { FaBars } from "react-icons/fa";

const Header = () => {
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
            className="d-flex flex-column justify-content-center align-items-center text-decoration-none"
            style={{ height: "50px", lineHeight: "1" }}
          >
            <span className="fs-5 fs-md-4 fs-lg-3 fw-bold text-white">
              <i> Registration </i>
            </span>
            <span className="fs-6 fs-md-5 fw-light text-white">Pvt. Ltd.</span>
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

        <nav className="d-md-none w-100 d-flex justify-content-between align-items-center">
          <Link
            to="/"
            className="d-flex flex-column justify-content-center align-items-center text-decoration-none ms-2"
            style={{ height: "50px", lineHeight: "1" }}
          >
            <span className="fs-5 fs-md-4 fs-lg-3 fw-bold text-white">
              <i> Registration </i>
            </span>
            <span className="fs-6 fs-md-5 fw-light text-white">Pvt. Ltd.</span>
          </Link>
          <button
            onClick={toggleNav}
            className="text-white text-decoration-none bg-transparent border-none cursor-pointer me-3"
          >
            <FaBars style={{ color: "white", fontSize: "24px" }} />
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isNavOpen && (
        <div className="d-md-none bg-black text-white w-full">
          <div className="gradient-border"></div>
          <div className="d-flex flex-column align-items-center py-2">
            {homePage ? (
              <>
                <Link
                  to="/login"
                  className="text-white text-decoration-none py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white text-decoration-none py-2"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-white text-decoration-none py-2"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    {login && (
                      <Link
                        to="/register"
                        className="text-white text-decoration-none py-2"
                      >
                        Register
                      </Link>
                    )}
                    {register && (
                      <Link
                        to="/login"
                        className="text-white text-decoration-none py-2"
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
      )}

      <div className="gradient-border"></div>
    </>
  );
};

export default Header;
