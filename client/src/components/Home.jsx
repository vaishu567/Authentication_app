// import { URL } from "../url";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import UploadForm from "./UploadForm";
import "../styles/style.css";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="homecontainer">
        <div>
          <h3 className="heading">Upload images below!</h3>
        </div>
        <UploadForm />
      </div>
    </>
  );
};

export default Home;
