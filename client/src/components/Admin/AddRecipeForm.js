import "./AddRecipeForm.css";
import { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setsubTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [tips, setTips] = useState([]);

  const handleSave = async () => {
    try {
      const response = await fetch(`/newblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subtitle,
          ingredients,
          steps,
          tips,
          status: "Draft",
        }),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePublish = async () => {
    try {
      const response = await fetch(`/newblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subtitle,
          ingredients,
          steps,
          tips,
          status: "Published",
        }),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-recipe-form">
      <div className="add-recipe-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handlePublish}>Publish</button>
      </div>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor="subtitle">Subtitle:</label>
        <input
          type="text"
          id="subtitle"
          value={subtitle}
          onChange={(event) => setsubTitle(event.target.value)}
        />
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          value={ingredients.join("\n")}
          onChange={(event) => setIngredients(event.target.value.split("\n"))}
        />
        <label htmlFor="steps">Steps:</label>
        <textarea
          id="steps"
          value={steps.join("\n")}
          onChange={(event) => setSteps(event.target.value.split("\n"))}
        />
        <label htmlFor="tips">Tips:</label>
        <textarea
          id="tips"
          value={tips.join("\n")}
          onChange={(event) => setTips(event.target.value.split("\n"))}
        />
      </form>
    </div>
  );
};

export default AddRecipeForm;
