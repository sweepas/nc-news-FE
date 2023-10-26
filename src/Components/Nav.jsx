import { NavLink } from "react-router-dom";
import LoginDash from "./LoginDash";
import Topics from "./Topics";
import "../nav.css";

function Nav() {
  return (
    <div className="nav-container">
      <nav className="nav-bar">
        <NavLink to="/" className="nav-link">
          Home |
        </NavLink>
        <NavLink to="/articles" className="nav-link">
          Articles |
        </NavLink>
        {<Topics />}
        {<LoginDash />}
      </nav>
    </div>
  );
}
export default Nav;
