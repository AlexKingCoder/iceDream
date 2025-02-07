const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredientImg: { type: String, required: false, default: null },
    type: { type: String, enum: ["Yogurt", "Helado", "Elemento", "Extra"], required: true },
    price: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

const Ingredient = mongoose.model("ingredients", ingredientSchema, "ingredients");
module.exports = Ingredient;