const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema ({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
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
    type: [String],
    required: true,
  },
  bookmark_counter: { type: Number, default: 0 },
  like_counter: { type: Number, default: 0 },
  time_consuming: {
    value: {
      type: Number,
      required: false,
    },
    unit: {
      type: String,
      enum: ['minutes', 'hours'],
      required: false,
    }
  },
  average_rating: { 
    type: Number,
    default: 0,
  },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Intermediate', 'Advanced', ''], 
    default: '',
  },
  tags: [
    {
      type: String,
    }
  ]
}, {
  timestamps: true,
});


module.exports = mongoose.model('Recipe', recipeSchema);