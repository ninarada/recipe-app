const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 
const { updateInteraction, getInteraction } = require('../controllers/userRecipeInteractionController');

router.get('/userRecipeInteraction', protect, getInteraction);      // GET /api/interactions/userRecipeInteraction - Get interaction 
router.post('/userRecipeInteraction', protect, updateInteraction);  // POST /api/interactions/userRecipeInteraction - Update interaction

module.exports = router;