//modules
const express = require("express");
const multer = require("multer");
//controlers
const blogsControlers = require("../controlers/blogsControlers");
//utils
const { userRoles } = require("../utils/userRols");
//middlewares
const verifyToken = require("../middlewares/verifyToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const allowedTo = require("../middlewares/allowedTo");

//recieve images
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/blogs");
    },
    filename: function (req, file, cb) {
        const blogID = req.params.id;
        const ext = file.mimetype.split("/")[1];
        const fileName = `blog-ID:${blogID}-${Date.now()}.${ext}`;
        cb(null, fileName);
    },
});

const fileFilter = function (req, file, cb) {
    const imageType = file.mimetype.split("/")[0];
    if (imageType == "image") {
        return cb(null, true);
    } else {
        const error = AppError.create("file must be an image", 400);
        return cb(error, false);
    }
};

const upload = multer({ storage: diskStorage, fileFilter });

//routes
const router = express.Router();

router
    .route("/")
    .get(blogsControlers.allBlogs)
    .post(
        upload.single("avatar"),
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        blogsControlers.createBlog
    );

router
    .route("/:id")
    .get(blogsControlers.oneBlog)
    .patch(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        upload.single("avatar"),
        blogsControlers.editBlog
    )
    .delete(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        blogsControlers.deleteBlog
    );

module.exports = router;
