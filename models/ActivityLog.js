const mongoose = require("mongoose");

const ActSchema = new mongoose.Schema({
    email: {
        type: String
        // ref: "User"
    },
    login: {
        type: Date
    },
    duration: {
        type: Number
    },
    logout: {
        type: Date
    }
});
const Active = mongoose.model("Active", ActSchema,'Activity_log');
module.exports = Active;
