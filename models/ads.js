// Define a Mongoose schema for User
const mongoose = require('mongoose');
const { Schema } = mongoose;


const adsSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  timestamps: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ad', adsSchema);
