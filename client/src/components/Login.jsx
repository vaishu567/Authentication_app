import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import "../styles/style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/user/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      sessionStorage.setItem("userData", JSON.stringify(res));
      navigate("/home");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <div className="logincontainer">
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 ">
        <p className="text-lg md:text-xl font-extrabold">
          <h1 className="heading">Image Market!</h1>
        </p>
      </div>
      <div className="container flex flex-col">
        <div className=" ">
          <div className="">
            <h2 className="heading">Login to account!</h2>
            <div className="inputf">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="text"
                type="text"
                placeholder="Enter your email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="text"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <button onClick={handleLogin} className="bi">
                Log in
              </button>
            </div>
            {error && <h3 className="error ">Something went wrong!</h3>}
            <div className="down">
              <p className="smt">New here?</p>
              <p className="text-gray-500 hover:text-black">
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
