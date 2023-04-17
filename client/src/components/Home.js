import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);

  //Vertical: Recent 4 recipes
  // Horizontal: Favorited 4 recipes

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
    <div className="recipe-featured-list">
      {featured.slice(0, 4).map((recipe) => (
        <div className="recipe" key={recipe._id}>
          <Link to={`/recipes/${recipe._id}`}>
            <h2>{recipe.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Home;
