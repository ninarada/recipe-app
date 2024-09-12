// Contains route handler functions for recipes

const Recipe = require('../models/recipe');

// @desc    Get all recipes
// @route   GET /api/recipes
const getRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
};

// @desc    Add a new recipe
// @route   POST /api/recipes
const addRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;

  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions,
    user: req.user._id, // Assuming authentication
  });

  const createdRecipe = await newRecipe.save();
  res.status(201).json(createdRecipe);
};

// Exporting controller methods
module.exports = {
  getRecipes,
  addRecipe,
};
