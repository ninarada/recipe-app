const User = require('../models/User');
const Recipe = require('../models/Recipe'); 
const users = require('./seedUser');
const recipes = require('./seedRecipe');

const seedUsers = async () => {
    try {  
      for (const userData of users) {
          const existingUser = await User.findOne({
            $or: [{ username: userData.username }, { email: userData.email }],
          });
    
          if (existingUser) {
            console.log(`User with username "${userData.username}" or email "${userData.email}" alredy exists. Skipped adding.`);
            continue;
          }
  
          await User.create({
            username: userData.username,
            email: userData.email,
            password: userData.password,
          });
    
          console.log(`User "${userData.username}" successfully added to db.`);
        }
      } catch (error) {
      console.error("Error while seeding users:", error);
    }
};
  
const seedRecipes = async () => {
    try {
      const existingRecipes = await Recipe.find();
      if (existingRecipes.length > 0) {
          console.log("Recipes already exist in the database. Skipping seeding.");
          return; 
      }

      const users = await User.find();
  
      for (const recipeData of recipes) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
  
        const newRecipe = new Recipe({
          ...recipeData,
          author: randomUser._id, 
        });
  
        await newRecipe.save();
        console.log(`Recipe "${recipeData.title}" successfully added.`);
      }
    } catch (error) {
      console.error("Error while seeding recipes:", error);
    }
};

module.exports = {
    seedUsers,
    seedRecipes,
};