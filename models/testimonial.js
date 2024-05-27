const mongoose = require('mongoose');

// Define the schema for the blog
const tesimonialSchema = new mongoose.Schema({
 
    treatment: {
        type: String,
        required: true,
    }
    ,title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    }
});


// Create a model from the schema
const tesimonial = mongoose.model('testimonial', tesimonialSchema);

module.exports = tesimonial;
