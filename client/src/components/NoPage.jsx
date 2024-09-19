import React from "react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();
  const redirect = () => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  redirect();
  return (
    <>
      <div
        className="bg-black text-white d-flex justify-content-center align-items-center"
        style={{ height: "86vh" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div
                className="card text-black border-0 shadow-lg"
                style={{ backgroundColor: "#000" }}
              >
                <div className="card-body-2">
                  <h1 className="text-white">Page Not Found</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPage;
