const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 
const { updateInteraction, getInteraction, getLikedRecipes, getBookmarkedRecipes, getRatedRecipes } = require('../controllers/userRecipeInteractionController');

router.get('/userRecipeInteraction', protect, getInteraction);      // GET /api/interactions/userRecipeInteraction - Get interaction 
router.post('/userRecipeInteraction', protect, updateInteraction);  // POST /api/interactions/userRecipeInteraction - Update interaction
router.get('/likedRecipes', protect, getLikedRecipes);              // GET /api/interactions/likedRecipes - Get liked recipes 
router.get('/bookmarkedRecipes', protect, getBookmarkedRecipes);    // GET /api/interactions/bookmarkedRecipes - Get bookmarked recipes 
router.get('/ratedRecipes', protect, getRatedRecipes);              // GET /api/interactions/ratedRecipes - Get rated recipes 

module.exports = router;