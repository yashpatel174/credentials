import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="gradient-border"></div>
      <div
        className="w-full bg-black text-white d-flex justify-content-between align-items-center"
        style={{ height: "full" }}
      >
        <div className="d-flex w-75 justify-content-between align-items-center m-auto text-white">
          <Link
            to="/"
            className="d-flex flex-column justify-content-center align-items-center text-decoration-none"
            style={{ height: "50px", lineHeight: "1" }}
          >
            <span className="fs-5 fw-bold text-white">
              {" "}
              <i> Registration </i>
            </span>
            <span className="fs-6 fw-light text-white">Pvt. Ltd.</span>
          </Link>
          <p className="mb-0">&copy; {new Date().getFullYear()} Registration pvt. ltd.</p>
          <ul className="list-unstyled mb-0">
            <li className="me-3">
              <Link
                to="/login"
                className="text-white text-decoration-none"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-white text-decoration-none"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
