import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ViewRecipeList.css";
import { UserContext } from "./UserContext";

const RecipeList = () => {
  const { recipeId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // This needs to be tabular with border boxes

  useEffect(() => {
    fetch("/blogs")
      .then((res) => res.json())
      .then((resData) =>
        // console.log(resData.data)
        setRecipes(
          resData.data.sort((a, b) => new Date(b.date) - new Date(a.date))
        )
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <table className="recipe-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe) => (
          <tr key={recipe._id}>
            <td>{recipe.title}</td>
            <td>{formatDate(recipe.date)}</td>
            <td>{recipe.status}</td>
            <td>
              <Link className="recipe-arrow" to={`/admin/recipe/${recipe._id}`}>
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
