const Recipe = require("../models/Recipe");

// @desc    Get all recipes
// @route   GET /api/recipes
const getRecipes = async (req, res) => {
  try {
    const limit = parseInt(req.query._limit, 10);
    const recipes = await Recipe.find()
      .sort({ like_counter: -1 }) 
      .limit(limit)
      .populate('author', 'username photo');
    res.json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @desc    Get the top 3 most liked recipes
// @route   GET /api/recipes/popular
const getPopularRecipes = async (req, res) => {
  try {
    const popularRecipes = await Recipe.find()
      .sort({ like_counter: -1 }) 
      .limit(3)
      .populate('author', 'username photo'); 

    if (popularRecipes.length === 0) {
      return res.status(404).json({ message: "No popular recipes found." });
    }

    res.json(popularRecipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// @desc    Get a single recipe by ID
// @route   GET /api/recipes/:id
const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId).populate('author', 'username photo');
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @desc    Get a recipes made by logged in user
// @route   GET /api/recipes/myProfile
// @access  Private (requires token)
const getMyRecipes = async (req, res) => {
  try {
    const userId = req.user._id;
    const recipes = await Recipe.find({author: userId}).populate('author', 'username photo');

    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found for this user" });
    }

    res.json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// @desc    Get tags 
// @route   GET /api/recipes/tags
const getTags = async (req, res) => {
  try {
    const tags = await Recipe.aggregate([
      { $match: { tags: { $exists: true, $not: { $size: 0 } } } },
      { $unwind: "$tags" },
      { $project: { tags: { $toLower: "$tags" } } },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { _id: 0, tag: "$_id" } }
    ]);

    const sortedTags = tags.map(item => item.tag);

    res.json(sortedTags); 
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @desc    Add a newly created recipe
// @route   POST /api/recipes/create
// @access  Private (requires token)
const createRecipe = async (req, res) => {
  const { title, description,  ingredients, instructions, time_consuming, difficulty, photo, tags } = req.body;

  if (!title ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const createdRecipe = await Recipe.create({
    title,
    author: req.user._id, 
    description,
    ingredients,
    instructions,
    time_consuming, 
    difficulty, 
    photo,
    tags,
  });

  if (createdRecipe) {
    res.status(201).json({
      _id: createdRecipe._id,
      title: createdRecipe.title,
      author: createdRecipe.author,
      description: createdRecipe.description,
      ingredients: createdRecipe.ingredients,
      instructions: createdRecipe.instructions,
      createdAt: createdRecipe.createdAt,
      bookmark_counter: createdRecipe.bookmark_counter,
      like_counter: createdRecipe.like_counter,
      time_consuming: createdRecipe.time_consuming, 
      difficulty: createdRecipe.difficulty, 
      photo: createdRecipe.photo,
      tags: createdRecipe.tags,
    });
  } else {
    res.status(400);
    throw new Error("Invalid recipe data");
  }
};

module.exports = {
  getRecipes,
  getPopularRecipes,
  createRecipe,
  getRecipeById,
  getMyRecipes,
  getTags,
};
