const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },
    rank: {
        type: Number,
        required: true

    },
    biz_name: {
        type: String,
        required: true

    },
    type: {
        type: String,
        required: true

    }
});

const Rank = mongoose.model('Rank', UserSchema, 'biz_rank');

module.exports = Rank;