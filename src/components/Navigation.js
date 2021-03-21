import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <ul className="navList">
      <li className="navListItem">
        <NavLink
          exact
          to="/"
          className="navLink"
          activeClassName="navLink--active"
        >
          Home
        </NavLink>
      </li>
      <li className="navListItem">
        <NavLink
          to="/movies"
          className="navLink"
          activeClassName="navLink--active"
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
