const adminRouter = require("express").Router();
const { getUsers, createIngredient, updateIngredient, deleteIngredient, getRecipes } = require("../controllers/admin.js");
const { isAuth, isAdmin } = require("../../middlewares/auth.js");
const upload = require("../../middlewares/file.js");

adminRouter.get("/search-users/:id?", isAuth, isAdmin, getUsers);

adminRouter.post("/create-ingredient", isAuth, isAdmin, upload.single("ingredientImg"), createIngredient);
adminRouter.put("/update-ingredient/:id", isAuth, isAdmin, upload.single("ingredientImg"), updateIngredient);
adminRouter.delete("/delete-ingredient/:id", isAuth, isAdmin, deleteIngredient);

adminRouter.get('/search-recipes/:id?', isAuth, isAdmin, getRecipes);

module.exports = adminRouter;