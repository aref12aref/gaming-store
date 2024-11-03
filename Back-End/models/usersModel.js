const mongoose = require("mongoose");
const validator = require("validator");
const { userRoles } = require("../utils/userRols");

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "field must be a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    role: {
        type: String,
        enum: [userRoles.ADMIN, userRoles.MANAGER, userRoles.USER],
        default: userRoles.USER,
    },
    avatar: {
        type: String,
        default: "uploads/profile.png",
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    },
});

module.exports = mongoose.model("User", UsersSchema);
