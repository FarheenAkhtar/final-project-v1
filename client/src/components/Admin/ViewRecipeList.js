import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ViewRecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  // This needs to be tabular with border boxes

  useEffect(() => {
    fetch("/blogs")
      .then((res) => res.json())
      .then((resData) =>
        // console.log(resData.data)
        setRecipes(resData.data)
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <table className="recipe-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe) => (
          <tr key={recipe._id}>
            <td>{recipe.title}</td>
            <td>{recipe.date}</td>
            <td>
              <Link className="recipe-arrow" to={`/recipe/${recipe._id}`}>
                &#10148;
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecipeList;
