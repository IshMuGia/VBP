const mongoose = require('mongoose');

const SolSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },

    brand: {
        type: String,
        required: true

    },
    video: {
        type: String,
        required: true

    },
    powerbi: {
        type: String,
        required: true

    },
    s_desc: {
        type: String,
        required: true

    },
    solution: {
        type: String,
        required: true

    },
    logo: {
        type: String,
        required: true

    }
});

const solutions = mongoose.model('solutions', SolSchema, 'solutions');

module.exports = solutions;