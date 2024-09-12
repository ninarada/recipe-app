// Defines the API routes for recipe-related endpoints

const express = require('express');
const router = express.Router();
const { getRecipes, addRecipe } = require('../controllers/recipeController');

// Route for getting all recipes and adding a new one
router.route('/')
  .get(getRecipes)
  .post(addRecipe);

module.exports = router;