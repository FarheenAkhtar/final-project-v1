## GET /api/recipes

**Returns a list of all the recipes on the website, along with some basic information like the recipe's name and featured image.**

## GET /api/recipes/:id

**Returns the full details of a specific recipe, including the recipe's name, description, ingredients, steps, and comments.**

## POST /api/recipes

**Adds a new recipe to the database. This would be used by the admin panel to create new blog posts.**

## PUT /api/recipes/:id

**Updates an existing recipe in the database. This would be used by the admin panel to edit an existing blog post.**

## DELETE /api/recipes/:id

**Deletes a recipe from the database. This would be used by the admin panel to remove a blog post.**

## GET /api/categories

**Returns a list of all the recipe categories on the website, along with the number of recipes in each category.**

## GET /api/categories/:name

**Returns a paginated list of recipes in a specific category. This would be used for the category page of the website.**

## POST /api/comments

**Adds a new comment to a recipe. This would be used by users to leave comments on a recipe, and the comment would need to be approved by an admin before it is visible to the public.**

## GET /api/comments/:id

**Returns a specific comment, along with the recipe it is associated with.**

## PUT /api/comments/:id

**Updates an existing comment. This would be used by the admin panel to approve or reject comments.**

## DELETE /api/comments/:id

**Deletes a comment from the database. This would be used by the admin panel to remove inappropriate comments.**
