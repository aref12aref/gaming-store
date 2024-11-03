//models
const Product = require("../models/productsModel");
//middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");
//utils
const httpResponse = require("../utils/httpRespone");

//get all products
const allProducts = asyncWrapper(async (req, res) => {
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const products = await Product.find({}, { __v: false })
        .populate("category")
        .limit(limit)
        .skip(skip);

    res.status(200).json(httpResponse.goodResponse(200, products));
});

//create product
const createProduct = asyncWrapper(async (req, res) => {
    const { title, price, description, category } = req.body;
    let avatar;
    if (req.file !== undefined) {
        avatar = req.file.filename;
    }
    if (!title || !price || !category) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const product = new Product({
        title: title,
        price: price,
        description: description ? description : null,
        category: category,
    });

    if (avatar) {
        product.avatar = avatar;
    }

    await product.save();

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            product,
            "Product created successfully",
            newToken
        )
    );
});

//get one product
const oneProduct = asyncWrapper(async (req, res) => {
    const productID = req.params.id;
    if (!productID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const product = await Product.findById(productID, { __v: false }).populate(
        "category"
    );
    res.status(200).json(httpResponse.goodResponse(200, product));
});

//delete product
const deleteProduct = asyncWrapper(async (req, res) => {
    const productID = req.params.id;
    if (!productID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const product = await Product.deleteOne({ _id: productID });

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(
        httpResponse.goodResponse(
            200,
            product,
            "Product deleted successfully",
            newToken
        )
    );
});

//edit || update product
const editProduct = asyncWrapper(async (req, res) => {
    const productID = req.params.id;
    let newAvatar;
    if (req.file !== undefined) {
        newAvatar = req.file.filename;
    }

    if (!productID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const oldProduct = await Product.findById(productID);

    const product = await Product.findByIdAndUpdate(productID, {
        $set: {
            ...req.body,
            avatar: newAvatar ? newAvatar : oldProduct.avatar,
        },
    });

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            product,
            "Product updated successfully",
            newToken
        )
    );
});

module.exports = {
    allProducts,
    createProduct,
    deleteProduct,
    oneProduct,
    editProduct,
};
