import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import "./Likes.css";

const Like = ({ recipeId }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [likes, setLikes] = useState(1);

  useEffect(() => {
    // fetch number of likes
    fetch(`/likes/${recipeId}`)
      .then((res) => res.json())
      .then((resData) => {
        setLikes(resData.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLikes = () => {
    if (isToggled) {
      // Decrement likes
      setLikes(likes - 1);
    } else {
      // Increment likes
      setLikes(likes + 1);
    }
    setIsToggled(!isToggled);
  };

  return (
    <button
      onClick={handleLikes}
      className={`like-button${isToggled ? " toggled" : ""}`}
    >
      <span className="like-icon">
        {isToggled ? <FaHeart /> : <FaRegHeart />}
      </span>
      <span className="like-count">{likes}</span>
    </button>
  );
};

export default Like;
