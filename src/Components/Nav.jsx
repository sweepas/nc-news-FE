import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./Home";

function Nav() {
  return (
    <nav>
      <NavLink to="/">Home |</NavLink>
      <NavLink to="/articles"> Articles |</NavLink>
    </nav>
  );
}
export default Nav;
