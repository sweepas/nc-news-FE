import { NavLink } from "react-router-dom";

import LoginDash from "./LoginDash";
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
        {<LoginDash />}
      </nav>
    </div>
  );
}

export default Nav;
