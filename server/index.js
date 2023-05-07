"use strict";

const express = require("express");
const morgan = require("morgan");

// const app = express();

// import handlers here
const {
  createBlog,
  getBlog,
  getPublishedRecipes,
  getOnePublishedRecipe,
  createTag,
  getAllTags,
  getItemsFromCategory,
  contactUs,
  authenticateUser,
  updateBlog,
  newsletterList,
  getLikes,
  deleteRecipe,
} = require("./handlers");

const { generateUploadURL } = require("./s3.js");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //Endpoints

  .post("/newblog", createBlog)
  .get("/blogs", getBlog)
  .get("/recipes", getPublishedRecipes)
  .get("/recipes/:recipeId", getOnePublishedRecipe)
  .post("/newtag", createTag)
  .get("/tags", getAllTags)
  .get("/category/:categoryId", getItemsFromCategory)
  .get("/likes/:recipeId", getLikes)
  .post("/contactus", contactUs)
  .post("/login", authenticateUser)
  .post("/newsletter", newsletterList)
  .patch("/update/:recipeId", updateBlog)
  .delete("/delete/:recipeId", deleteRecipe)

  // GET secure URL where images will be sent to S3 bucket ADMIN ENDPOINT
  .get("/s3Url", async (req, res) => {
    const url = await generateUploadURL();
    res.send({ url });
  })

  //catch
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  //listening on Port

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
