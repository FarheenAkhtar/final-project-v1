import React, { useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import AddRecipeForm from "./AddRecipeForm";
import "./Panel.css";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Panel = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="panel-main-container">
      <div className="panel-menu-container">
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
      <div className="panel-menu-container">
        <div className="addrecipeform">
          <h1>Add or Save Recipes </h1>
          <AddRecipeForm />
        </div>
      </div>
    </div>
  );
};

export default Panel;
