import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import headerpic from "../assets/headerpic.jpg";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/about" className="nav__link">
              About
            </Link>
          </li>
          <li className="nav__item nav__dropdown">
            <span onClick={toggleMenu} className="nav__link">
              Recipes
            </span>
            {showMenu && (
              <ul className="nav__submenu">
                <li className="nav__submenu-item">
                  <Link to="/recipes/breakfast" className="nav__submenu-link">
                    Breakfast
                  </Link>
                </li>
                <li className="nav__submenu-item">
                  <Link to="/recipes/lunch" className="nav__submenu-link">
                    Lunch
                  </Link>
                </li>
                <li className="nav__submenu-item">
                  <Link to="/recipes/dinner" className="nav__submenu-link">
                    Dinner
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <img src={headerpic} className="header_image" alt="Header" />
          </li>
          <li className="nav__item">
            <Link to="/contact" className="nav__link">
              Contact
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/login" className="nav__link">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
