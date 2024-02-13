import { Link } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
import { useContext } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import "../styles/style.css";

const Navbar = () => {
  //   const [menu, setMenu] = useState(false);

  // console.log(prompt)

  //   const showMenu = () => {
  //     setMenu(!menu);
  //   };

  const { user } = useContext(UserContext);

  return (
    <div className="nav">
      <h2 className="text-lg md:text-xl font-extrabold">Image Market!</h2>

      <div className="navitems">
        {user ? (
          <Menu />
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
      </div>
    </div>
  );
};

export default Navbar;
