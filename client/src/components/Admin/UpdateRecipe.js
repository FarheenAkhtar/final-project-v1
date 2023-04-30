// import "./UpdateRecipeForm.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";

const UpdateRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [tips, setTips] = useState([]);
  const [tags, setTags] = useState([]);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [allTags, setAllTags] = useState([]);
  const { recipeId } = useParams();
  const [changedFields, setChangedFields] = useState({});

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  useEffect(() => {
    fetch(`/blogs`)
      .then((res) => res.json())
      .then((resData) => {
        const filteredRecipe = resData.data.find(
          (recipe) => recipe._id === recipeId
        );
        console.log(filteredRecipe);
        setTitle(filteredRecipe.title);
        setSubtitle(filteredRecipe.subtitle);
        setIngredients(filteredRecipe.ingredients);
        setSteps(filteredRecipe.steps);
        setTips(filteredRecipe.tips);
        setTags(filteredRecipe.tags);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [recipeId]);

  const handleUpdate = async () => {
    const response = await fetch(`/update/${recipeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedFields),
    }).then((res) => {
      if (res.status > 500) {
        // error handling
      } else {
        res
          .json()
          .then((resData) => {
            window.alert(resData.message);
          })
          .catch((err) => window.alert(err));
      }
    });
  };

  const handleTagChange = (event) => {
    setTags(event.target.value.split(","));
  };

  useEffect(() => {
    fetch(`/tags`)
      .then((res) => res.json())
      .then((tagsData) => {
        setAllTags(tagsData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setChangedFields({ ...changedFields, title: event.target.value });
          }}
        />
        <label htmlFor="subtitle">Subtitle:</label>
        <input
          type="text"
          id="subtitle"
          value={subtitle}
          onChange={(event) => {
            setSubtitle(event.target.value);
            setChangedFields({
              ...changedFields,
              subtitle: event.target.value,
            });
          }}
        />
        <label htmlFor="image1">Featured Image</label>
        <input
          type="file"
          id="image1"
          value={image1}
          onChange={(event) => {
            const file = event.target.files[0];
            setImage1(event.target.value);
            setChangedFields({ ...changedFields, image1: event.target.value });
          }}
        />

        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          value={ingredients.join("\n")}
          onChange={(event) => {
            setIngredients(event.target.value.split("\n"));
            setChangedFields({
              ...changedFields,
              ingredients: event.target.value,
            });
          }}
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
          onChange={(event) => {
            setTips(event.target.value.split("\n"));
            setChangedFields({ ...changedFields, tips: event.target.value });
          }}
        />

        {/* <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          id="tags"
          value={tags.join(",")}
          onChange={handleTagChange}
        /> */}
      </form>
      <div>
        {allTags.length > 0 && (
          <div>
            {allTags.map((tag) => (
              <span key={tag.id}>{tag.tagname}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateRecipeForm;
