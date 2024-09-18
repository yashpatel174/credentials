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
        <div
          className="card text-black border-0 shadow-lg"
          style={{ backgroundColor: "#ff803e", display: "inline-block", whiteSpace: "nowrap" }}
        >
          <div className="card-body-2 bg-black d-flex flex-column align-items-center justify-content-center">
            <p
              className="text-center fs-4 fs-md-5 fs-lg-6"
              style={{ color: "#ff803d" }}
            >
              Welcome to the dashboard!
            </p>
            <p
              className="text-center fs-5 fs-md-6 fs-lg-7"
              style={{ color: "#ff803d" }}
            >
              Your email is
            </p>
            <p
              className="text-center fs-3 fs-md-4 fs-lg-5 text-white"
              style={{ whiteSpace: "nowrap" }}
            >
              {data}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
