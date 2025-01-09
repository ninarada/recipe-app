const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const userRecipeInteractionRoutes = require('./routes/userRecipeInteractionRoutes')
const { errorHandler } = require('./middleware/errorMiddleware');
const { seedInteractions } = require('./seeds/seeders');
const seedUsers = require('./seeds/seeders').seedUsers;
const seedRecipes = require('./seeds/seeders').seedRecipes;

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

connectDB().then(async () => {
  await seedUsers();  
  await seedRecipes();
  await seedInteractions();

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}).catch((error) => {
  console.error(`Error while connecting to the database: ${error.message}`);
});

app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interactions', userRecipeInteractionRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
  });
}