import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => (
  <nav className="app-menu">
    <ul className="app-menu__list">
      <li className="app-menu__item">
        <Link className="app-menu__link" to="/">
          Home
        </Link>
      </li>

      <li className="app-menu__item">
        <Link className="app-menu__link" to="/Model/1">
          Models
        </Link>
      </li>

      <li className="app-menu__item">
        <Link className="app-menu__link" to="/Stats">
          Stats
        </Link>
      </li>
    </ul>
  </nav>
);

export default Menu;
