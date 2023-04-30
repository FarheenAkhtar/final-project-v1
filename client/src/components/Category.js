import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { FiHeart } from "react-icons/fi";
import "./Home.css";

const CategoryList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState(null);
  const [tags, setTags] = useState([]);

  //   Secondary
  // const [recipes, setRecipes] = useState([]);
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
            setRecipes(resData.data);
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
    <div className="wrapper">
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
      <div className="recipe-featured-list">
        {recipes.map((recipe) => (
          <div className="recipe" key={recipe._id}>
            <img src={recipe.image1} className="featured_image" alt="Header" />

            <div className="blog-post-container">
              <img src={RxAvatar} className="admin_image" alt="AdminAvatar" />
              <div className="post-metadata__date time-ago">{recipe.date}</div>
              <span className="post-metadata__readTime">2 min</span>

              <Link to={`/recipes/${recipe._id}`}>
                <h2>{recipe.title}</h2>
              </Link>
              <p>{recipe.subtitle}</p>

              <div className="post-stats">
                <div className="post-footer-view-count">0views</div>
                <img src={FiHeart} className="post-footer-like-button" />
                <div>0likes</div>
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
