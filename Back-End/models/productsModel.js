const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    avatar: {
        type: String,
        default: "uploads/product.png",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Categorie",
    },
});

module.exports = mongoose.model("Product", ProductsSchema);
