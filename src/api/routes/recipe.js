const recipesRouter = require('express').Router();
const { createRecipe, getUserRecipes, deleteRecipe, updateRecipe } = require('../controllers/recipe.js');
const { isAuth } = require("../../middlewares/auth.js");
const upload = require("../../middlewares/file.js");

recipesRouter.post('/create', isAuth, upload.single("recipeImg"), createRecipe);
recipesRouter.get('/search/:id?', isAuth, getUserRecipes);
recipesRouter.put('/update/:id', isAuth, upload.single("recipeImg"), updateRecipe);
recipesRouter.delete('/delete/:id', isAuth, deleteRecipe);

module.exports = recipesRouter;