const mongoose = require("mongoose");

const ChatBotSchema = mongoose.Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
});

module.exports = mongoose.model("ChatBot", ChatBotSchema);
