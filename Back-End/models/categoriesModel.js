const mongoose = require("mongoose");

const CategoriesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    avatar: {
        type: String,
        default: "uploads/product.png",
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
});

module.exports = mongoose.model("Categorie", CategoriesSchema);
