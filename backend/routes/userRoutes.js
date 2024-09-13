const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/', registerUser);           // POST /api/users - Register a new user
router.post('/login', authUser);          // POST /api/users/login - Login user

// Private route (requires authentication)
router.get('/profile', protect, getUserProfile);  // GET /api/users/profile - Get user profile

module.exports = router;
