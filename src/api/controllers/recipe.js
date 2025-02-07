const Ingredient = require("../models/Ingredient.js");
const Recipe = require("../models/Recipe.js");
const User = require("../models/User.js");

const createRecipe = async (req, res) => {
    try {
        const { name, recipeImg, yogurt, helado, elemento, extra, notas } = req.body;
        const yogurtExists = await Ingredient.findById(yogurt);
        const heladoExists = await Ingredient.findById(helado);
        const elementoExists = await Ingredient.findById(elemento);
        const extraExists = await Ingredient.findById(extra);

        if (!yogurtExists) {
            return res.status(406).json({ message: "El yogurt introducido no es válido." });
        }

        if (!heladoExists) {
            return res.status(406).json({ message: "El helado introducido no es válido." });
        }

        if (!elementoExists) {
            return res.status(406).json({ message: "El elemento introducido no es válido." });
        }

        if (!extraExists) {
            return res.status(406).json({ message: "El extra introducido no es válido." });
        }

        const newRecipe = new Recipe({
            name,
            recipeImg,
            yogurt,
            helado,
            elemento,
            extra,
            notas,
            creador: req.user._id
        });

        if (req.file) {
            newRecipe.recipeImg = req.file.path;
        }

        const savedRecipe = await newRecipe.save();

        const userId = req.user.id; 

        await User.findByIdAndUpdate(
            userId,
            { $push: { recipes: savedRecipe._id } },
            { new: true }
        );

        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(500).json({ message: "No se ha podido crear la receta", error });
    }
};

const getUserRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (id) {
      const recipe = await Recipe.findById(id)
        .populate("yogurt")
        .populate("helado")
        .populate("elemento")
        .populate("extra")
        .populate("creador");

      if (!recipe) {
        return res.status(404).json({ message: "No se ha encontrado la receta." });
      }

      if (!recipe.creador.equals(userId)) {
        return res.status(403).json({ message: "Acceso no autorizado: Esta receta no forma parte de tu repertorio." });
      }

      res.json({
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
    } else {
      const user = await User.findById(userId).populate({
        path: "recipes",
        populate: [
          { path: "yogurt", select: "name -_id" },
          { path: "helado", select: "name -_id" },
          { path: "elemento", select: "name -_id" },
          { path: "extra", select: "name -_id" },
          { path: "creador", select: "name -_id" },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "Error. El usuario no existe." });
      }

      res.status(200).json(user.recipes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las recetas." });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json("Error. Esta receta no existe.");
    }

    if (!recipe.creador.equals(userId)) {
      return res.status(403).json({ message: "Acceso no autorizado: Esta receta no te pertenece y no puedes actualizarla." });
    }

    const recipeUpdated = await Recipe.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    return res.status(200).json(recipeUpdated);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error. No se ha podido actualizar la receta.");
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user._id;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json("Error. Esta receta no existe.");
    }

    if (!recipe.creador.equals(userId)) {
      return res.status(403).json({
        message: "Acceso no autorizado: Esta receta no te pertenece y no puedes eliminarla."
      });
    }

    const recipeDeleted = await Recipe.findByIdAndDelete(recipeId);

    if (recipeDeleted.recipeImg) {
      await deleteFile(recipeDeleted.recipeImg);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { recipes: recipeId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Error. El usuario al que se quiere actualizar la receta no existe." });
    }

    return res.status(200).json({
      message: "Receta eliminada.",
      element: recipeDeleted
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getUserRecipes,
  updateRecipe,
  deleteRecipe
}