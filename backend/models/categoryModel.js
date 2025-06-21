const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true, // Ensures the name is unique
    trim: true, // Automatically trims whitespace
    set: (value) => value.toLowerCase(), // Converts the string to lowercase
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item', // Reference to the itemModel
    },
  ],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;