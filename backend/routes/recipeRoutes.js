const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes, getRecipeById, getMyRecipes } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware'); 

router.get('/', getRecipes);                        // GET /api/recipes - Get all recipes
router.get('/myProfile', protect, getMyRecipes);       // GET /api/recipes/myProfile - Get info of logged in user
router.get('/:id', getRecipeById);                  // GET /api/recipes/:id - Get recipe by id
//router.get('/profile/:username', getUserProfileByUsername);  // GET /api/recipes/profile/:username - Get recipes of specific user 

router.post('/create', protect, createRecipe);      // POST /api/recipes/create - Add new recipe
  
module.exports = router;