require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const userRouter = require("./src/api/routes/user.js");
const ingredientRouter = require("./src/api/routes/ingredient.js");
const recipesRouter = require("./src/api/routes/recipe.js");
const adminRouter = require("./src/api/routes/admin.js");
const { connectCloudinary } = require("./src/config/cloudinary.js");

const server = express();

connectDB();
connectCloudinary();

server.use(express.json());

server.use("/api/v1/users", userRouter);

server.use("/api/v1/ingredients", ingredientRouter);

server.use("/api/v1/recipes", recipesRouter);

server.use("/api/v1/admin", adminRouter);

server.listen(3000, () => {
    console.log("Servidor operativo.");
})

server.use("*", (req, res, next) => {
    return res.status(404).json("Esta ruta no existe. Comprueba la url.");
})