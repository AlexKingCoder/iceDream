const Ingredient = require("../models/Ingredient.js");

const getIngredients = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (id) {
        const ingredient = await Ingredient.findById(id);
  
        if (!ingredient) {
          return res.status(404).json({ message: "Ingrediente no encontrado." });
        }
  
        return res.status(200).json(ingredient);
      }
  
      const ingredients = await Ingredient.find();
      return res.status(200).json(ingredients);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al buscar el ingrediente." });
    }
  };

module.exports = { getIngredients }