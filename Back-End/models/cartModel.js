const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    ],
});

module.exports = mongoose.model("Cart", CartSchema);
