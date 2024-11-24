const mongoose = require('mongoose');
const { Schema } = mongoose;

const userRecipeInteractionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  bookmarked: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserRecipeInteraction', userRecipeInteractionSchema);
