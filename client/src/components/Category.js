import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Category.css";
import adminAvatar from "../assets/admin_avatar.png";
import Like from "./Likes";

const CategoryList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState(null);
  const [tags, setTags] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tags
  useEffect(() => {
    fetch("/tags")
      .then((res) => res.json())
      .then((resData) => setTags(resData.data))
      .catch((err) => window.alert(err));
  }, []);

  // Fetch recipes by category
  useEffect(() => {
    fetch(`/category/${categoryId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to fetch recipes");
        } else {
          res.json().then((resData) => {
            const publishedRecipes = resData.data.filter(
              (recipe) => recipe.status === "Published"
            );
            publishedRecipes.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            setRecipes(publishedRecipes);
            setLoading(false);
          });
        }
      })
      .catch((err) => window.alert(err));
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="category_recipe_wrapper">
      <div className="horizontal-tag-list">
        <ul>
          {tags.map((tag) => (
            <li
              key={tag._id}
              className={categoryId === tag.tagname ? "active" : ""}
            >
              <Link to={`/category/${tag.tagname}`}>
                {tag.tagname.slice(0, 1).toUpperCase() + tag.tagname.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="category_container">
        {recipes.map((recipe) => (
          <div className="category_featured_recipe" key={recipe._id}>
            <img
              src={recipe.image1}
              className="category_featured_image"
              alt="Header"
            />

            <div className="category_blog-post-container">
              <div className="category_post-metadata-container">
                <img
                  src={adminAvatar}
                  className="category_admin_image"
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
                <h2 className="category_recipe_title">{recipe.title}</h2>
              </Link>
              <p>{recipe.subtitle}</p>

              <div className="category_recipe_subtitle">
                <Like recipeId={recipe._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    // Show all tags from the database but highlight the categoryId that is being used in useparams
  );
};

export default CategoryList;
