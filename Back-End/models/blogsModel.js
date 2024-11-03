const mongoose = require("mongoose");

const BlogsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "uploads/product.png",
    },
});

module.exports = mongoose.model("Blog", BlogsSchema);
