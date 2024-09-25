const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema ({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you'll have authentication later
    required: true,
  },
  description: { 
    type: String,
    required: true, 
  },
  photo: { 
    type: String,
    required: false,
  },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
      unit: { type: String, required: false },
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  bookmark_counter: { type: Number, default: 0 },
  like_counter: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Recipe = mongoose.model("Recipe", recipeSchema, "recipe");

module.exports = Recipe;