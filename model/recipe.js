const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String },
  type: { type: String },
  description: { type: String },
  recipe: { type: String },
  email: { type: String },
  image: { type: String },
  ingredients: { type: Array },
  price: { type: Number },
  tags: { type: String },
  id: { type: Array },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
