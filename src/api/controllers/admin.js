const User = require("../models/User");
const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");
const cloudinary = require("cloudinary").v2;
const { deleteFile } = require("../../utils/deleteFile");

const getUsers = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Error. Usuario no encontrado. Asegúrate de introducir una id válida." });
      }
      return res.status(200).json(user);
    }

    const users = await User.find();
    return res.status(200).json(users);
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error al buscar usuario(s). Comprueba la conexión a la base de datos." });
  }
};

const createIngredient = async (req, res) => {

  let imageUrl;

  try {
    const newIngredient = new Ingredient(req.body);

    const ingredientNameExist = await Ingredient.findOne({ name: newIngredient.name });
    
    if (ingredientNameExist) {
      if (req.file) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json("Este ingrediente ya existe. Por favor, elige un ingrediente nuevo.");
    }

    if (!["Yogurt", "Helado", "Elemento", "Extra"].includes(newIngredient.type)) {
      if (req.file) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(406).json({ message: "El tipo de ingrediente introducido no es válido." });
    }

    if (req.file) {
      newIngredient.ingredientImg = req.file.path;
    }

    const ingredientSaved = await newIngredient.save();

    return res.status(201).json({
      message: "Ingrediente creado con éxito",
      ingredient: ingredientSaved
    });

  } catch (error) {
    console.log(error);

    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    return res.status(400).json("No se ha podido crear el ingrediente");
  }
};

const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: "Necesitas adjuntar la imagen del ingrediente." });
    }

    const ingredientUpdated = await Ingredient.findByIdAndUpdate(
      id,
      { ingredientImg: file.path },
      { new: true }
    );

    if (!ingredientUpdated) {
      return res.status(404).json({ message: "El ingrediente que quieres actualizar no existe." });
    }

    return res.status(200).json(ingredientUpdated);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el ingrediente." });
  }
};

const deleteIngredient = async (req, res) => {
  try {
      const { id } = req.params;
      const ingredientDeleted = await Ingredient.findByIdAndDelete(id);

      if (ingredientDeleted.ingredientImg) {
        await deleteFile(ingredientDeleted.ingredientImg);
      }

      return res.status(200).json({
          message: "Ingrediente eliminado con éxito",
          element: ingredientDeleted
      });
  } catch (error) {
      console.log(error);
      return res.status(400).json("No se ha podido borrar el ingrediente");
  }
};

const getRecipes = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const recipe = await Recipe.findById(id)
        .populate("yogurt")
        .populate("helado")
        .populate("elemento")
        .populate("extra")
        .populate("creador");

      if (!recipe) {
        return res.status(404).json({ message: "No se ha encontrado la receta. Asegúrate de introducir la id correcta." });
      }

      return res.json({
        recipeName: recipe.name,
        ingredients: {
          yogurt: recipe.yogurt ? recipe.yogurt.name : "No hay datos",
          helado: recipe.helado ? recipe.helado.name : "No hay datos",
          elemento: recipe.elemento ? recipe.elemento.name : "No hay datos",
          extra: recipe.extra ? recipe.extra.name : "No hay datos",
        },
        creador: recipe.creador ? recipe.creador.name : "No hay datos",
        notas: recipe.notas,
      });
    }

    const recipes = await Recipe.find();
    return res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error al buscar la receta." });
  }
};

module.exports = {
  getUsers,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getRecipes };