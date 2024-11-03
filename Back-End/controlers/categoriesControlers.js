//models
const Category = require("../models/categoriesModel");
//middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");
//utils
const httpResponse = require("../utils/httpRespone");

//get all categories
const allCategories = asyncWrapper(async (req, res) => {
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const categories = await Category.find({}, { __v: false })
        .populate("products")
        .limit(limit)
        .skip(skip);

    res.status(200).json(httpResponse.goodResponse(200, categories));
});

//create category
const createCategory = asyncWrapper(async (req, res) => {
    const { title, description, products } = req.body;
    let avatar;
    if (req.file !== undefined) {
        avatar = req.file.filename;
    }
    if (!title) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const category = new Category({
        title: title,
        description: description ? description : null,
        products: products,
    });

    if (avatar) {
        category.avatar = avatar;
    }

    await category.save();

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            category,
            "Category created successfully",
            newToken
        )
    );
});

//get one category
const oneCategory = asyncWrapper(async (req, res) => {
    const categoryID = req.params.id;
    const categoryTitle = req.params.title;
    if (!categoryID && !categoryTitle) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    let category;
    if (categoryID) {
        category = await Category.findById(categoryID).populate("products");
    } else if (categoryTitle) {
        category = await Category.find({ title: categoryTitle }).populate(
            "products"
        );
    }

    res.status(200).json(httpResponse.goodResponse(200, category));
});

//delete category
const deleteCategory = asyncWrapper(async (req, res) => {
    const categoryID = req.params.id;
    if (!categoryID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const category = await Category.deleteOne({ _id: categoryID });

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(
        httpResponse.goodResponse(
            200,
            category,
            "Category deleted successfully",
            newToken
        )
    );
});

//edit || update category
const editCategory = asyncWrapper(async (req, res) => {
    const categoryID = req.params.id;
    var newAvatar;
    let newData = {};

    if (!categoryID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    if (req.body.title) {
        newData.title = req.body.title;
    }

    if (req.body.description) {
        newData.description = req.body.description;
    }

    if (req.file !== undefined) {
        newAvatar = req.file.filename;
    }

    const oldCategory = await Category.findById(categoryID);
    if (req.body.products) {
        var oldProducts = oldCategory.products;
        for (let i = 0; i < req.body.products.length; i++) {
            oldProducts.push(req.body.products[i]);
        }
    }

    const category = await Category.findByIdAndUpdate(categoryID, {
        $set: {
            ...newData,
            avatar: newAvatar ? newAvatar : oldCategory.avatar,
            products: oldProducts,
        },
    });

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            category,
            "Category updated successfully",
            newToken
        )
    );
});

module.exports = {
    allCategories,
    createCategory,
    deleteCategory,
    oneCategory,
    editCategory,
};
