import { Route, Routes, NavLink } from "react-router-dom";
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
      </nav>
    </div>
  );
}
export default Nav;
