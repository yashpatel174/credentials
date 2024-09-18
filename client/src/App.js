import React from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./Routes/Routers.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <Routers />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
      />
    </>
  );
}

export default App;
