import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import BrandImage from "../assets/BlogHeader.png";
import { UserContext } from "./Admin/UserContext";

const Header = () => {
  const [showMenu, setShowMenu] = useState("");
  const [tags, setTags] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    fetch(`/tags`)
      .then((res) => res.json())
      .then((resData) => {
        setTags(resData.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSignOut = () => {
    window.localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <header className="header">
      <nav>
        <ul className="nav_list">
          <li className="nav_item">
            <Link to="/" className="nav_link">
              Home
            </Link>
          </li>
          <li className="nav_item">
            <Link to="/about" className="nav_link">
              About
            </Link>
          </li>
          <li className="nav_item">
            <Link className="nav_link">Recipes</Link>
            <ul className="dropdown">
              {tags.map((tag) => (
                <li key={tag._id} className="nav_item">
                  <Link to={`/category/${tag.tagname}`}>{tag.tagname}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <img src={BrandImage} className="header_image" alt="Header" />
          </li>
          <li className="nav_item">
            <Link to="/contact" className="nav_link">
              Contact
            </Link>
          </li>

          {/* Signed In User */}
          {currentUser ? (
            <ul className="hidden_nav_list">
              {/* Link Signed In User to Dashboard */}
              <Link to={"/admin/add-recipe"} className="nav_link">
                <li className="nav_item">My Dashboard</li>
              </Link>

              {/* User can sign out */}
              <Link to={"/"} onClick={handleSignOut} className="nav_link">
                <li className="nav_item">Sign Out</li>
              </Link>
            </ul>
          ) : (
            <div>
              <li className="nav_item">
                <Link to="/login" className="nav_link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
