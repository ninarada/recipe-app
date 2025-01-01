const express = require('express');
const router = express.Router();
const { registerUser, authUser, getMyProfile, saveProfile, changePassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);         // POST /api/users/register - Register a new user
router.post('/login', authUser);                // POST /api/users/login - Login user

// Private route (requires authentication)
router.put('/profile', protect, saveProfile);           // PUT /api/users/profile - Save edited user profile
router.put('/change-password', protect, changePassword);  // PUT /api/users/profile - Save edited user profile

router.get('/profile', protect, getMyProfile);  // GET /api/users/profile - Get user profile
//router.get('/profile/:id', getUserProfile);  // GET /api/users/profile - Get user profile

module.exports = router;
