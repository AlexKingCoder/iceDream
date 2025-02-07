const ingredientRouter = require("express").Router();
const { getIngredients } = require("../controllers/ingredient.js");
const { isAuth } = require("../../middlewares/auth.js");

ingredientRouter.get("/search/:id?", isAuth, getIngredients);

module.exports = ingredientRouter;