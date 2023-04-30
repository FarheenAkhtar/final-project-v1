const { MongoClient, ObjectId } = require("mongodb");
// package to generate unique ids
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// GET /admin/view-recipe : Returns a list of all the recipes on the website
const getBlog = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "blogs"
    const blogs = db.collection("blogs");

    const result = await blogs.find({}).toArray();

    await console.log("blog", result);

    if (result) {
      // On success/no error, send
      return res.status(200).json({
        status: 200,
        success: true,
        data: result,
      });
    }
  } catch (err) {
    // on failure/error, send
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // TODO: close client
    client.close();
    console.log("disconnected!");
  }
};

// GET /recipes : Returns a list of all the PUBLISHED recipes on the website
const getPublishedRecipes = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "blogs"
    const blogs = db.collection("blogs");

    const result = await blogs.find({ status: "Published" }).toArray();

    // await console.log("blog", result);

    if (result) {
      // On success/no error, send
      return res.status(200).json({
        status: 200,
        success: true,
        data: result,
      });
    }
  } catch (err) {
    // on failure/error, send
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // TODO: close client
    client.close();
    console.log("disconnected!");
  }
};

// GET /recipe/:recipeId: Returns the full details of a specific recipe

const getOnePublishedRecipe = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "blogs"
    const blogs = db.collection("blogs");

    const { recipeId } = req.params;

    const result = await blogs.findOne({
      _id: recipeId,
      status: "Published",
    });

    await console.log("Result", result);

    if (result) {
      // On success/no error, send
      return res.status(200).json({
        status: 200,
        success: true,
        data: result,
      });
    } else {
      // if no recipe found
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Recipe not found",
      });
    }
  } catch (err) {
    // on failure/error, send
    return res
      .status(500)
      .json({ status: 500, success: false, message: "Internal server error" });
  } finally {
    // close client
    client.close();
    console.log("disconnected!");
  }
};

// POST /admin/add-recipe: Adds a new recipe to the database along with save or publish tag. ADMIN PORTAL API endpoint
const createBlog = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "blogs"
    const blogs = db.collection("blogs");

    // Add new _id to customer array
    const _id = uuidv4();

    // Capture date
    const date = new Date();

    // Destructure req.body
    const { ...data } = req.body;

    // Add the generated ID & date to the request body
    const requestBody = { _id, date, ...data };

    // insert a new document into the "customers" collection
    const result = await blogs.insertOne(requestBody);

    await console.log("blog", result);

    if (result.acknowledged) {
      // On success/no error, send
      return res.status(201).json({
        status: 201,
        success: true,
        message: "A new recipe was successfully created",
        data: req.body,
      });
    }
    // on failure/error, send
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Could not create the blog",
    });
  } catch (err) {
    // on failure/error, send
    console.log(err.stack);
    return res
      .status(404)
      .send({ status: 404, success: false, message: err.message });
  } finally {
    // TODO: close client
    client.close();
    console.log("disconnected!");
  }
};

// PUT /admin/recipes/:id: Updates an existing recipe in the database or updates tags (unpublish/publish). ADMIN PORTAL API endpoint
const updateBlog = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "blogs"
    const blogs = db.collection("blogs");

    // Capture id from req.params
    const { recipeId } = req.params;

    // Capture revision date
    const date = new Date();

    // Capture data from req.body
    const { ...data } = req.body;

    // Construct update query
    const updateQuery = {
      $set: { date, ...data },
    };

    console.log("updateQuery", updateQuery);

    // Update the blog document in the "blogs" collection with the given id
    const result = await blogs.updateOne({ _id: recipeId }, updateQuery);

    await console.log("blog", result);

    if (result.modifiedCount > 0) {
      // On success/no error, send
      return res.status(200).json({
        status: 200,
        success: true,
        message: "The recipe was successfully updated",
        data: req.body,
      });
    }
    // on failure/error, send
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Could not update the blog",
    });
  } catch (err) {
    // on failure/error, send
    console.log(err.stack);
    return res
      .status(404)
      .send({ status: 404, success: false, message: err.message });
  } finally {
    // TODO: close client
    client.close();
    console.log("disconnected!");
  }
};

// DELETE /recipes/:id: Deletes a recipe from the database. ADMIN PORTAL API endpoint

// GET /categories: Returns a list of all the recipe categories on the website, along with the number of recipes in each category.

const getAllTags = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "tags"
    const tags = db.collection("tags");

    const result = await tags.find({}).toArray();

    await console.log("tags", result);

    if (result) {
      // On success/no error, send
      return res.status(200).json({
        status: 200,
        success: true,
        data: result,
      });
    }
  } catch (err) {
    // on failure/error, send
    return res
      .status(404)
      .send({ status: 404, success: false, message: error });
  } finally {
    // TODO: close client
    client.close();
    console.log("disconnected!");
  }
};

// GET /categories/:categoryID: Returns a list of recipes that belong to a specific category.
const getItemsFromCategory = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "blogs"
    const blogs = await db.collection("blogs");

    // Capture id from req.params
    const { categoryId } = req.params;

    // get all recipes from the collection
    const allRecipes = await blogs.find().toArray();

    let finalRecipes = [];

    const filteredRecipes = allRecipes.map((recipe) => {
      if (recipe.tags) {
        recipe.tags.map((tag) => {
          if (tag.includes(categoryId)) {
            finalRecipes.push(recipe);
          }
          if (finalRecipes.length > 0) {
            return finalRecipes;
          }
        });
      }
    });

    if (finalRecipes.length === 0) {
      return res.status(404).json({
        status: 404,
        category: categoryId,
        message: "No category matches your search criteria.",
      });
    } else {
      return res.status(200).json({ status: 200, data: finalRecipes });
    }
  } catch (err) {
    // on failure/error, send
    return res.status(404).send({ status: 404, success: false, message: err });
  } finally {
    /// TODO: close client
    client.close();
    console.log("disconnected!");
  }
};

// POST/admin/tags: CREATE a new tag . ADMIN PORTAL API endpoint
const createTag = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "tags"
    const tags = db.collection("tags");

    // Add new _id to tags array
    const _id = uuidv4();

    // Destructure req.body
    const { ...data } = req.body;

    // add a condition to make sure it's not already created

    // Add the generated ID to the request body
    const requestBody = { _id, ...data };

    // insert a new document into the "customers" collection
    const result = await tags.insertOne(requestBody);

    await console.log("tags", result);

    if (result.acknowledged) {
      // On success/no error, send
      return res.status(201).json({
        status: 201,
        success: true,
        message: "A new tag was successfully created",
        data: req.body,
      });
    }
    // on failure/error, send
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Could not create the tag",
    });
  } catch (err) {
    // on failure/error, send
    console.log(err.stack);
    return res
      .status(404)
      .send({ status: 404, success: false, message: err.message });
  } finally {
    // TODO: close client
    client.close();
    console.log("disconnected!");
  }
};

// POST /login : this allows a registered user to login

const authenticateUser = async (req, res) => {
  // Destructure req.body
  const { email, password } = req.body;

  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "registeredUsers"
    const registeredUserCollection = db.collection("registeredUsers");
    await console.log("registeredUserCollection", registeredUserCollection);

    const result = await registeredUserCollection.findOne({
      email: email,
      password: password,
    });

    if (!result) {
      return res.status(404).json({
        status: 404,
        message: "Invalid email or password",
      });
    }

    delete result.password;

    return res.status(200).json({ status: 200, data: result });
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // close the connection to the database server
    client.close();
  }
};

// POST /contactus : this allows users to submit forms
const contactUs = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // Destructure req.body
  const { ...data } = req.body;

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "tags"
    const contactUsCollection = db.collection("contactUs");

    // Add new _id to contactUs array
    const _id = uuidv4();

    // Add the date stamp & id to the request body
    const requestBody = {
      _id,
      date: new Date(),
      ...data,
    };

    // insert a new document into the "customers" collection
    const result = await contactUsCollection.insertOne(requestBody);

    if (result) {
      // On success/no error, send
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Thank you for your message. We will get back to you shortly.",
      });
    }
    // on failure/error, send
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Message was not submitted",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // close the connection to the database server
    client.close();
  }
};

// POST /newsletter : this allows users to subscribe to newsletters or promotions
const newsletterList = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // Destructure req.body
  const { ...data } = req.body;

  try {
    // connect to the database
    const db = await client.db("food_blog");

    // create/access a new collection called "tags"
    const newsletterCollection = db.collection("newsletterList");

    // Add new _id to contactUs array
    const _id = uuidv4();

    // Add the date stamp & id to the request body
    const requestBody = {
      _id,
      date: new Date(),
      ...data,
    };

    // insert a new document into the "customers" collection
    const result = await newsletterCollection.insertOne(requestBody);

    if (result) {
      // On success/no error, send
      return res.status(201).json({
        status: 201,
        success: true,
        message: "You have been added to the newsletter list.",
      });
    }
    // on failure/error, send
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Could not be added to the list",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, success: false, message: error });
  } finally {
    // close the connection to the database server
    client.close();
  }
};

// POST /comments: Adds a new comment to a recipe. This would be used by users to leave comments on a recipe

// GET /comments/:id : Returns approved comments that are associated to the recipe. The comments would need to be approved by an admin before it is visible to the public.

// PUT /comments/:id : Updates an existing comment. ADMIN PORTAL API endpoint

module.exports = {
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
};
