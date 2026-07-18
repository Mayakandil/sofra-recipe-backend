const express = require('express');
const router = express.Router();
const SavedRecipe = require('../models/SavedRecipe');

// READ - Get all saved recipes
router.get('/', async (req, res) => {
  const saved = await SavedRecipe.find();
  res.json(saved);
});

// CREATE - Save a recipe
router.post('/', async (req, res) => {
  const existing = await SavedRecipe.findOne({ recipeId: req.body.recipeId });
  if (existing) return res.json({ message: 'Already saved' });
  const saved = new SavedRecipe(req.body);
  await saved.save();
  res.json(saved);
});

// UPDATE - Edit note on a saved recipe
router.put('/:id', async (req, res) => {
  const saved = await SavedRecipe.findByIdAndUpdate(req.params.id, { note: req.body.note }, { new: true });
  res.json(saved);
});

// DELETE - Remove a saved recipe
router.delete('/:id', async (req, res) => {
  await SavedRecipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Removed' });
});

module.exports = router;