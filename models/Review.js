const mongoose = require('mongoose');

const RevSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true

    },
    rating: {
        type: Number,
        required: true

    }
});

const Review = mongoose.model('Review', RevSchema, 'vbp_ratings');

module.exports = Review;