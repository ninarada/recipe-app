// Contains route handler functions for recipes

const Recipe = require('../models/recipe');

// @desc    Get all recipes
// @route   GET /api/recipes
const getRecipes = async (req, res) => {
  try {
    const limit = parseInt(req.query._limit, 10);
    const recipes = await Recipe.find().limit(limit);
    res.json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
  
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
