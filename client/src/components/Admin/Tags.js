import React, { useState, useContext, useEffect } from "react";
import "./Tags.css";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Tags = () => {
  const [categoryName, setCategoryName] = useState("");
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/newtag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });
      if (response.ok) {
        setCategoryName("");
        window.alert("A tag was successfully created");
      } else {
        window.alert("Failed to add a new tag");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="wrapper">
      <div className="tag-guidance">
        <h1>Tags</h1>
        <p>
          Adding tags to your food blogs is a great way to organize your content
          and make it easier for readers to find what they're looking for. Tags
          should be short keywords or phrases that describe the main topics or
          themes of your blog post. When creating your tags, make sure they are
          descriptive and concise.{" "}
        </p>
        <p>
          Place tags at the end of your blog post: Once you've finished writing
          your blog post, add your tags at the end of the post. You can either
          list them as comma-separated keywords. This will also help improve
          your website's search engine optimization (SEO). By adding tags to
          your food blogs, you can help readers find the content they're looking
          for and improve the visibility of your website in search engine
          results.{" "}
        </p>
      </div>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={handleChange}
          />
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default Tags;
