// Define a Mongoose schema for User
const mongoose = require('mongoose');
const { Schema } = mongoose;


const categorySchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    default: '#'
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
    underService: {
    type: Schema.Types.ObjectId,
    ref: 'services',
    required: true
  },
  timestamps: {
    type: Date,
    default: Date.now
  }
});

// Create a pre-save hook to auto-increment the ID
categorySchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }
  try {
    const lastCategory = await this.constructor.findOne({}, {}, { sort: { id: -1 } });
    if (lastCategory) {
      this.id = lastCategory.id + 1;
    } else {
      this.id = 1; // If no categories exist yet, start with 1
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Category', categorySchema);
