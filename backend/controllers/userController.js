const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already in use." });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
const authUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      const error = new Error('Invalid username or password');
      error.status = 401;  
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (requires token)
const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      photo: user.photo,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Save or update user profile information
// @route   PUT /api/users/profile
// @access  Private (requires token)
const saveProfile = async (req, res) => {
  const { username, email, photo } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (username) {
    const existingUsername = await User.findOne({ username });
    if (existingUsername && existingUsername._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: 'Username is already in use.' });
    }
    user.username = username;
  }

  if (email) {
    const existingEmail = await User.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }
    user.email = email;
  }

  if (photo) {
    user.photo = photo; 
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    photo: updatedUser.photo,
    token: generateToken(updatedUser._id),
  });
};

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private (requires token)
const changePassword = async (req, res) => {
  const { currentPassword, newPassword, } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!(await user.matchPassword(currentPassword))) {
    return res.status(400).json({ message: 'Incorrect current password' });
  }

  user.password = newPassword;
  await user.save();

  res.json({ message: 'Password changed successfully' });
};


module.exports = {
  registerUser,
  authUser,
  getMyProfile,
  saveProfile,
  changePassword,
};
