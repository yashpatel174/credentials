import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
            <Link
              to="/login"
              className="text-white text-decoration-none"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white text-decoration-none ms-3"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
      <div className="gradient-border"></div>
    </>
  );
};

export default Header;
