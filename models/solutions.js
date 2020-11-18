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
    category: {
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
    s_des: {
        type: String,
        required: true

    }
});

const solutions = mongoose.model('solutions', SolSchema, 'solutions');

module.exports = solutions;