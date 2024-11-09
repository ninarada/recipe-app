const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware'); 

// Route for getting all recipes and adding a new one
// router.route('/')
//   .get(getRecipes)  // GET /api/users/register - Register a new user
//   .post(addRecipe);

router.get('/', getRecipes);                        // GET /api/recipes - Get all recipes
router.post('/create', protect, createRecipe);      // POST /api/recipes/create - Add new recipe
  

  
module.exports = router;