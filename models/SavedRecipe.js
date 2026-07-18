const mongoose = require('mongoose');

const savedRecipeSchema = new mongoose.Schema({
  recipeId: String,
  name: String,
  main: String,
  image: String,
  all: [String],
  note: { type: String, default: "" }
});

module.exports = mongoose.model('SavedRecipe', savedRecipeSchema);