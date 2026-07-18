const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  main: String,
  image: String,
  all: [String]
});

module.exports = mongoose.model('Recipe', recipeSchema);