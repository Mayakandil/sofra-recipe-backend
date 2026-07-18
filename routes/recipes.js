const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// READ - Get all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// READ - Get single recipe
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

// CREATE - Add a new recipe
router.post('/', async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.json(recipe);
});

// UPDATE - Edit a recipe
router.put('/:id', async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate(req.id, req.body, { new: true });
  res.json(recipe);
});

// DELETE - Remove a recipe
router.delete('/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recipe deleted' });
});

module.exports = router;