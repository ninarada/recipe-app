const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema ({
  name: {
    type: String,
    required: true,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you'll have authentication later
    required: true,
  },
}, {
  timestamps: true,
});

const Recipe = mongoose.model("Recipe", recipeSchema, "recipe");

module.exports = Recipe;