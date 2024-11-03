//models
const Blog = require("../models/blogsModel");
//middlewares
const asyncWrapper = require("../middlewares/asyncWrapper");
//utils
const httpResponse = require("../utils/httpRespone");

//get all products
const allBlogs = asyncWrapper(async (req, res) => {
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({}, { __v: false }).limit(limit).skip(skip);

    res.status(200).json(httpResponse.goodResponse(200, blogs));
});

//create product
const createBlog = asyncWrapper(async (req, res) => {
    const { title, content } = req.body;
    let avatar;
    if (req.file !== undefined) {
        avatar = req.file.filename;
    }
    if (!title || !content) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const blog = new Blog({
        title: title,
        content: content,
    });

    if (avatar) {
        blog.avatar = avatar;
    }

    await blog.save();

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            blog,
            "Product created successfully",
            newToken
        )
    );
});

//get one product
const oneBlog = asyncWrapper(async (req, res) => {
    const blogID = req.params.id;
    if (!blogID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const blog = await Blog.findById(blogID, { __v: false });
    res.status(200).json(httpResponse.goodResponse(200, blog));
});

//delete product
const deleteBlog = asyncWrapper(async (req, res) => {
    const blogID = req.params.id;
    if (!blogID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const blog = await Blog.deleteOne({ _id: blogID });

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(200).json(
        httpResponse.goodResponse(
            200,
            blog,
            "Product deleted successfully",
            newToken
        )
    );
});

//edit || update product
const editBlog = asyncWrapper(async (req, res) => {
    const blogID = req.params.id;
    let newAvatar;
    if (req.file !== undefined) {
        newAvatar = req.file.filename;
    }

    if (!blogID) {
        return res
            .status(400)
            .json(httpResponse.badResponse(400, "Invalid data"));
    }

    const oldBlog = await Blog.findById(blogID);

    const blog = await Blog.findByIdAndUpdate(blogID, {
        $set: {
            ...req.body,
            avatar: newAvatar ? newAvatar : oldBlog.avatar,
        },
    });

    let newToken = null;
    if (req.currentUser.newAccessToken) {
        newToken = req.currentUser.newAccessToken;
    }

    res.status(201).json(
        httpResponse.goodResponse(
            201,
            blog,
            "Blog updated successfully",
            newToken
        )
    );
});

module.exports = {
    allBlogs,
    createBlog,
    oneBlog,
    deleteBlog,
    editBlog,
};
