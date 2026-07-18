const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/sofra')
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('Connection error:', err));

const recipeRoutes = require('./routes/recipes');
app.use('/api/recipes', recipeRoutes);

const savedRecipesRoutes = require('./routes/savedRecipes');
app.use('/api/saved', savedRecipesRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});