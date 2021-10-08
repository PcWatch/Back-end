const mongoose = require("mongoose");

const ingSchema = new mongoose.Schema({
  email: { type: String },
  item: { type: String },
  quantity: { type: String },
});

const Ingredients = mongoose.model("Ingredient", ingSchema);
module.exports = Ingredients;
