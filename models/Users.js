const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },
    name: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    biz_name: {
        type: String,
        required: true

    },
    timestamp: { 
        type: Date, 
        default: Date.now
    },
    biz_add: {
        type: String,
        required: true

    },
    biz_role: {
        type: String,
        required: true
    },
    biz_size: {
        type: String,
        required: true
    },
    biz_tier: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema, 'vbp_user');

module.exports = User;