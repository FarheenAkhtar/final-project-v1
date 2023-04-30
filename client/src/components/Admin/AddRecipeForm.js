//This is in Panel.js

import "./AddRecipeForm.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setsubTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [tips, setTips] = useState([]);
  const [tags, setTags] = useState([]);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [alltags, setAllTags] = useState([]);

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

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
          tags,
          image1,
          image2,
          status: "Draft",
        }),
      }).then((res) => {
        if (res.ok) {
          window.alert("Post was successfully saved");
        }
      });
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
          tags,
          image1,
          image2,
          status: "Published",
        }),
      }).then((res) => {
        if (res.ok) {
          window.alert("Post was successfully published");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTagChange = (event) => {
    setTags(event.target.value.split(","));
  };

  const handleImage1Upload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    // get secure url from our server
    const { url } = await fetch("/s3Url").then((res) => res.json());
    console.log("URL", url);

    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl1 = url.split("?")[0];
    window.alert("Image uploaded");

    setImage1(imageUrl1);

    return imageUrl1;

    // post requst to my server to store any extra data
  };

  const handleImage2Upload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    // get secure url from our server
    const { url } = await fetch("/s3Url").then((res) => res.json());
    console.log("URL", url);

    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl2 = url.split("?")[0];
    window.alert("Image uploaded");

    setImage2(imageUrl2);

    return imageUrl2;
  };

  // useEffect(() => {
  //   fetch(`/tags`)
  //     .then((res) => res.json())
  //     .then((resData) => {
  //       console.log(resData.data);
  //       // setAllTags(resData.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="add-recipe-form">
      <div className="add-save-buttons">
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
        <label htmlFor="tags">Tags:</label>
        <input id="tags" value={tags.join(",")} onChange={handleTagChange} />

        {/* <label htmlFor="image1">Image 1:</label>
        <input
          id="image1"
          placeholder="Paste link for image 1 here"
          onChange={(event) => setImage1(event.target.value)}
        /> */}
        <button
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("image1-input").click();
          }}
        >
          Upload Image 1
        </button>
        <input
          id="image1-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImage1Upload}
        />

        {/* <label htmlFor="image2">Image 2:</label>
        <input
          id="image2"
          placeholder="Paste link for image 2 here"
          onChange={(event) => setImage2(event.target.value)}
        /> */}
        <button
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("image2-input").click();
          }}
        >
          Upload Image 2
        </button>
        <input
          id="image2-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImage2Upload}
        />
      </form>
      <div>
        {alltags.length > 0 && (
          <div>
            {alltags.map((tag) => (
              <span key={tag.id}>{tag.tagname}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRecipeForm;
