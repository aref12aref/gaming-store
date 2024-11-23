//modules
const bcrypt = require("bcryptjs");
//models
const User = require("../models/usersModel");
const Cart = require("../models/cartModel");
//middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");
//utils
const httpResponse = require("../utils/httpRespone");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../utils/generateJWT");

//register
const register = asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body;
    let avatar;
    if (req.file !== undefined) {
        avatar = req.file.filename;
    }

    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "user already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    const accessToken = await generateAccessToken({
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
    });

    const refreshToken = await generateRefreshToken({
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
    });

    newUser.token = accessToken;
    newUser.refreshToken = refreshToken;

    if (avatar) {
        newUser.avatar = avatar;
    }

    const userCart = new Cart({
        price: 0,
        products: [],
    });

    await userCart.save();

    newUser.cart = userCart;

    await newUser.save();

    res.status(201).json(
        httpResponse.goodResponse(201, newUser, "user has been saved")
    );
});

//login
const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json(
                httpResponse.badResponse(400, "email and password are required")
            );
    }

    const oldUser = await User.findOne({ email: email }).populate("cart");
    if (!oldUser) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "user not exists"));
    }

    const matchedPassord = await bcrypt.compare(password, oldUser.password);
    if (!matchedPassord) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "password mismatch"));
    }

    const accessToken = await generateAccessToken({
        email: oldUser.email,
        id: oldUser._id,
        role: oldUser.role,
    });

    const refreshToken = await generateRefreshToken({
        email: oldUser.email,
        id: oldUser._id,
        role: oldUser.role,
    });

    oldUser.token = accessToken;
    oldUser.refreshToken = refreshToken;

    res.status(200).json(
        httpResponse.goodResponse(201, oldUser, "user logged in successfully")
    );
});

module.exports = {
    register,
    login,
};
