const Recipe = require("../models/Recipe");

// @desc    Get all recipes
// @route   GET /api/recipes
const getRecipes = async (req, res) => {
  try {
    const limit = parseInt(req.query._limit, 10);
    const recipes = await Recipe.find().limit(limit);
    res.json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @desc    Add a newly created recipe
// @route   POST /api/recipes/create
// @access  Private (requires token)
const createRecipe = async (req, res) => {
  const { title, description, photo, ingredients, instructions, time_consuming, difficulty, tags } = req.body;

  if (!title || !description || !ingredients || !instructions) {
    console.log(title);
    return res.status(400).json({ message: "All fields are required." });
  }

  const createdRecipe = await Recipe.create({
    title,
    author: req.user._id, 
    description,
    photo,
    ingredients,
    instructions,
    time_consuming, 
    difficulty, 
    tags,
  });

  if (createdRecipe) {
    res.status(201).json({
      _id: createdRecipe._id,
      title: createdRecipe.title,
      author: createdRecipe.author,
      description: createdRecipe.description,
      photo: createdRecipe.photo,
      ingredients: createdRecipe.ingredients,
      instructions: createdRecipe.instructions,
      createdAt: createdRecipe.createdAt,
      bookmark_counter: createdRecipe.bookmark_counter,
      like_counter: createdRecipe.like_counter,
      time_consuming: createdRecipe.time_consuming, 
      difficulty: createdRecipe.difficulty, 
      tags: createdRecipe.tags,
    });
  } else {
    res.status(400);
    throw new Error("Invalid recipe data");
  }
};

module.exports = {
  getRecipes,
  createRecipe,
};
