import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import "./ViewRecipeList.css";

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
        <div className="recipe" key={recipe._id}>
          <h2>{recipe.title}</h2>
          <h3>{recipe.subtitle}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4>Steps:</h4>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <h4>Tips:</h4>
          <ul>
            {recipe.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
};

export default DetailedRecipe;
