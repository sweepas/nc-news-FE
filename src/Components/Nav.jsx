import { NavLink } from "react-router-dom";
import { useState } from "react";

import LoginDash from "./LoginDash";
import "../nav.css";

function Nav() {
  const [isActive, setIsActive] = useState(false);

  const handleToggleClick = () => {
    
    setIsActive(!isActive);
  };

  return (
    <>
      <nav className="nav-bar">
        <div className="brand-name">NC NEWS</div>
        <a href="#" className="toogle-btn" onClick={handleToggleClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className={`nav-options ${isActive ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/articles" className="nav-link">
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink to="/articles/add" className="nav-link">
                New Article
              </NavLink>
            </li>
            <li>
              <NavLink to="/topics" className="nav-link">
                New Topic
              </NavLink>
            </li>
          </ul>
        </div>
        {<LoginDash />}
      </nav>
    </>
  );
}

export default Nav;
