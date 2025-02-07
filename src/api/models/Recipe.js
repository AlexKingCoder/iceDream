const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    recipeImg: { type: String, required: false},
    yogurt: {type: mongoose.Types.ObjectId, ref: "ingredients", required: true},
    helado: {type: mongoose.Types.ObjectId, ref: "ingredients", required: true},
    elemento: {type: mongoose.Types.ObjectId, ref: "ingredients", required: true},
    extra: {type: mongoose.Types.ObjectId, ref: "ingredients", required: true},
    notas: {type: String, required: false},
    creador: { type: mongoose.Types.ObjectId, ref: "users", required: true }
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema, "recipes");
module.exports = Recipe;