// Entry point for the backend server

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
connectDB();

// Import and use routes
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware (optional)
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});