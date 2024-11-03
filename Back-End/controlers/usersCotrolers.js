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
const { userRoles } = require("../utils/userRols.js");

//get all users
const allUsers = asyncWrapper(async (req, res) => {
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const users = await User.find({}, { __v: false })
        .populate("cart")
        .limit(limit)
        .skip(skip);

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(httpResponse.goodResponse(200, users, "", newToken));
});

//get one user
const oneUser = asyncWrapper(async (req, res) => {
    const userID = req.params.id;
    if (!userID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const user = await User.findById(userID, { __v: false }).populate("cart");

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(httpResponse.goodResponse(200, user, "", newToken));
});

//create user
const createUser = asyncWrapper(async (req, res) => {
    const { username, email, password, role } = req.body;
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

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
        avatar,
    });
    generateRefreshToken;

    const token = await generateAccessToken({
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
    });

    const refreshToken = await generateRefreshToken({
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
    });

    newUser.token = token;
    newUser.refreshToken = refreshToken;

    if (avatar) {
        product.avatar = avatar;
    }

    const userCart = new Cart({
        price: 0,
        products: null,
    });

    newUser.cart = userCart;

    await newUser.save();

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(201, newUser, "user has been saved", newToken)
    );
});

//delete user
const deleteUser = asyncWrapper(async (req, res) => {
    const userID = req.params.id;
    if (!userID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const oldUser = await User.findById(userID);
    if (oldUser.cart) {
        const userCartID = oldUser.cart._id;

        await Cart.deleteOne({ _id: userCartID });
    }

    const user = await User.deleteOne({ _id: userID });

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(
        httpResponse.goodResponse(200, user, "user deleted", newToken)
    );
});

//edit || update user
const editUser = asyncWrapper(async (req, res) => {
    const userID = req.params.id;
    let newAvatar;
    if (req.file !== undefined) {
        newAvatar = req.file.filename;
    }

    if (!userID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    let oldUser = await User.findById(userID).populate("cart");

    if (req.body.username) {
        const newUserName = req.body.username;
        if (oldUser.username !== newUserName) {
            oldUser.username = newUserName;
        }
    }

    if (req.body.email) {
        const newEmail = req.body.email;
        if (oldUser.email !== newEmail) {
            oldUser.email = newEmail;
        }
    }

    if (req.body.password) {
        const newPassword = req.body.password;
        const matchedPassord = await bcrypt.compare(
            newPassword,
            oldUser.password
        );
        if (!matchedPassord) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            oldUser.password = hashedPassword;
        }
    }

    if (req.body.role) {
        const newRole = req.body.role;
        if (req.currentUser.role === userRoles.USER) {
            oldUser.role = newRole;
        } else {
            return res
                .status(400)
                .json(
                    httpResponse.badResponse(400, "You Can't Edit Your Role!")
                );
        }
    }

    if (req.body.cart) {
        const newUserCart = req.body.cart;

        const oldUserCartID = oldUser.cart;

        let oldUserCart = await Cart.findById(oldUserCartID);

        if (newUserCart.products.length > 0) {
            oldUserCart.price += newUserCart.price;
            oldUserCart.products.push(newUserCart.products);
        }

        await Cart.findByIdAndUpdate(oldUserCartID, {
            $set: {
                price: oldUserCart.price,
                products: oldUserCart.products,
            },
        });
    }

    const user = await User.findByIdAndUpdate(userID, {
        $set: {
            username: oldUser.username,
            email: oldUser.email,
            password: oldUser.password,
            role: oldUser.role,
            avatar: newAvatar ? newAvatar : oldUser.avatar,
        },
    });

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(
        httpResponse.goodResponse(201, user, "user updated", newToken)
    );
});

module.exports = {
    allUsers,
    deleteUser,
    oneUser,
    editUser,
    createUser,
};
