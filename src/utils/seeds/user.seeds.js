const mongoose = require("mongoose");
const User = require("../../api/models/User");
const users = require("../../data/user");
const Ingredient = require("../../api/models/Ingredient");
const ingredients = require("../../data/ingredient");
const Recipe = require("../../api/models/Recipe");

const seed = async () => {
    try {
        await mongoose.connect("mongodb+srv://OliverCotton:OliverIsMyFavouriteCharacter@cluster0.w0idy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        await User.collection.drop();
        console.log("Todos los usuarios eliminados correctamente.");

        await Ingredient.collection.drop();
        console.log("Todos los ingredientes eliminados correctamente.");

        await Recipe.collection.drop();
        console.log("Todos las recetas eliminados correctamente.");

        await Ingredient.insertMany(ingredients);
        console.log("Datos predeterminados de ingredientes cargados.");

        await User.insertMany(users);
        console.log("Datos predeterminados de usuarios cargados.");

        console.log("La base de datos está lista para usarse.");

    } catch (error) {
        console.log("Error al ejecutar la Seed en la base de datos.", error);
    }
}

seed();