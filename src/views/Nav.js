import "./Nav.scss";
import { Link, NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <div className="topnav">
      <NavLink to="/" activeClassName="active" exact>
        Home
      </NavLink>
      <NavLink to="/timer" activeClassName="active">
        Timer App
      </NavLink>
      <NavLink to="/todos" activeClassName="active">
        Todos App
      </NavLink>
      <NavLink to="/blogs" activeClassName="active">
        Blog
      </NavLink>
      <NavLink to="/secret" activeClassName="active">
        Secret Meaning
      </NavLink>
    </div>
  );
};
export default Nav;
