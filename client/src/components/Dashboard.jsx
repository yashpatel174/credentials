import axios from "axios";
import React, { useEffect, useState } from "react";

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
        console.log(response, "dashboard");
        setData(response.data.message);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return <div>Dashboard Content: {data}</div>;
};

export default Dashboard;
