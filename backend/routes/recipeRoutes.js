const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes, getRecipeById, getMyRecipes, getPopularRecipes, getTags } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware'); 

router.get('/', getRecipes);                        // GET /api/recipes - Get all recipes
router.get('/popular', getPopularRecipes);          // GET /api/recipes/popular - Get popular recipes
router.get('/myProfile', protect, getMyRecipes);    // GET /api/recipes/myProfile - Get info of logged in user
router.get('/tags', getTags);                       // GET /api/recipes/tags - Get tags
router.get('/:id', getRecipeById);                  // GET /api/recipes/:id - Get recipe by id
//router.get('/profile/:username', getUserProfileByUsername);  // GET /api/recipes/profile/:username - Get recipes of specific user 

router.post('/create', protect, createRecipe);      // POST /api/recipes/create - Add new recipe
  
module.exports = router;