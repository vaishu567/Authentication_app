import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL, IF } from "../url";
import { UserContext } from "../context/UserContext";
// import { useParams } from "react-router-dom";
import "../styles/style.css";

const Profile = () => {
  //   const param = useParams().id;
  const { user } = useContext(UserContext);
  const userDataString = sessionStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  console.log(user);
  const { data } = userData;
  console.log(data.name);
  const [sdata, setdata] = useState(null);

  useEffect(() => {
    axios
      .get(URL + "/user/getimages")
      .then((response) => {
        // Handle the resolved data here
        setdata(response.data);
        console.log("got images", response.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching images:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="pronav">
          <h1 className="text">Hi {data.name}!</h1>
        </div>
        <div className="images">
          <h2 className="text">Your Uploads:</h2>
          <div className="cont">
            {sdata?.map((p) => (
              <div className="imagcon">
                <img src={IF + p.image} className="myposts" alt="images" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
