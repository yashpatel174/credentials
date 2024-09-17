import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/user/dashboard",
          {},
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setData(response.data.result);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-black text-white d-flex justify-content-center align-items-center vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div
                className="card text-black border-0 shadow-lg"
                style={{ backgroundColor: "#000" }}
              >
                <div className="card-body-2">
                  <h4
                    className="text-center mb-4"
                    style={{ color: "#ff803e" }}
                  >
                    <i>Welcome to the dashboard!</i> <br />
                    <h2
                      className="text-center mb-4"
                      style={{ color: "#ff803e" }}
                    >
                      Your email is <br />
                      <h1 className="text-center mb-4 text-white">{data}</h1>
                    </h2>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
