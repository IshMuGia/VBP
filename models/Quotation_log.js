const mongoose = require("mongoose");

const ActSchema = new mongoose.Schema({
    email: {
        type: String
        // ref: "User"
    },
    Quote: {
        type: Date
    }
});
const Quote = mongoose.model("Quote", ActSchema,'Quotation_log');
module.exports = Quote;
