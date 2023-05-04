import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/");
    return null;
  }

  return (
    <div className="sidebar">
      <Link to="/admin/add-recipe">
        <h1>New Post</h1>
      </Link>

      <Link to={`/admin/view-recipe`}>
        <h1>All Posts</h1>
      </Link>

      {/* <Link to={`/admin/tags`}>
        <h1>New Tags</h1>
      </Link> */}
    </div>
  );
};

export default Sidebar;
