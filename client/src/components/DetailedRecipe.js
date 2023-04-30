import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./DetailedRecipe.css";

// Like Unlike Comment Panel

const DetailedRecipe = () => {
  const [recipe, setRecipe] = useState([]);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/recipes/${recipeId}`)
      .then((res) => res.json())
      .then((resData) =>
        // console.log(resData.data)
        setRecipe(resData.data)
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="recipe-list">
      {Object.keys(recipe).length > 0 ? (
        <div className="detailed_recipe" key={recipe._id}>
          <h2>{recipe.title}</h2>
          <h3>{recipe.subtitle}</h3>
          <img
            src={recipe.image1}
            className="detailed_recipe_image"
            alt="featuredImage"
          />
          <h4>Ingredients:</h4>
          <ul className="detailed_recipe_bulletlist">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4>Steps:</h4>
          <ol className="detailed_recipe_numberedlist">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <h4>Tips:</h4>
          <ul className="detailed_recipe_bulletlist">
            {recipe.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <img
            src={recipe.image2}
            className="detailed_recipe_image"
            alt="SecondaryImage"
          />
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
};

export default DetailedRecipe;
