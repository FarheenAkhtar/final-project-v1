import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import adminAvatar from "../assets/admin_avatar.png";
import Like from "./Likes";

const Home = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`/recipes`)
      .then((res) => res.json())
      .then((resData) => {
        // Sort the data by date, latest to oldest
        const sortedData = resData.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setFeatured(sortedData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      {featured.slice(0, 4).map((recipe) => (
        <div className="featured_recipe" key={recipe._id}>
          <img src={recipe.image1} className="featured_image" alt="Header" />

          <div className="blog-post-container">
            <div className="post-metadata-container">
              <img
                src={adminAvatar}
                className="admin_image"
                alt="AdminAvatar"
              />
              <div>
                {new Date(recipe.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <span>2 min</span>
            </div>

            <Link to={`/recipes/${recipe._id}`}>
              <h2 className="recipe_title">{recipe.title}</h2>
            </Link>
            <div className="recipe_subtitle">{recipe.subtitle}</div>

            <div className="post-stats">
              <Like recipeId={recipe._id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Home;
