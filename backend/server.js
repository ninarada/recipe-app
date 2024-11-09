const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const seedUsers = require('./seeds/seeders').seedUsers;
const seedRecipes = require('./seeds/seeders').seedRecipes;

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


connectDB().then(async () => {
  await seedUsers();  
  await seedRecipes();

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}).catch((error) => {
  console.error(`Error while connecting to the database: ${error.message}`);
});

app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);