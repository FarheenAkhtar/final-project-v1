import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/add-recipe">
        <h1>New Post</h1>
      </Link>

      <Link to={`/admin/view-recipe`}>
        <h1>All Posts</h1>
      </Link>
    </div>
  );
};

export default Sidebar;
