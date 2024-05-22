  // category.js

  const mongoose = require('mongoose');
  const { v4: uuidv4 } = require('uuid');

  const subcategorySchema = new mongoose.Schema({
    id: { 
      type: String ,  
      required: true,
      default: uuidv4
    },
    name: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    images: {
      type: String
    },
    createdat: {
      type: Date,
    }
  });

  const categorySchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true,
      unique: true
    },
    subcategory: [subcategorySchema],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, { collection: 'category' }); // Specify the collection name as 'category'

  // Create a pre-save hook to auto-increment the ID
categorySchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }
  try {
    const lastUser = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
    if (lastUser) {
      this.id = lastUser.id + 1;
    } else {
      this.id = 1; // If no users exist yet, start with 1
    }
    next();
  } catch (error) {
    next(error);
  }
});

  module.exports = mongoose.model('Category', categorySchema); // Export the model as 'Category'
