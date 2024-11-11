const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes, getRecipeById } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware'); 

router.get('/', getRecipes);                        // GET /api/recipes - Get all recipes
router.get('/:id', getRecipeById);                  // GET /api/recipes/:id - Get recipe by id
router.post('/create', protect, createRecipe);      // POST /api/recipes/create - Add new recipe
  
module.exports = router;