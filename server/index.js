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
  contactUs,
} = require("./handlers");

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
  .post("/contactus", contactUs)

  //catch
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  //listening on Port

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
