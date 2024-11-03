//modules
const express = require("express");
const multer = require("multer");
//controlers
const categoriesControlers = require("../controlers/categoriesControlers");
//utils
const { userRoles } = require("../utils/userRols");
//middlewares
const verifyToken = require("../middlewares/verifyToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const allowedTo = require("../middlewares/allowedTo");

//recieve images
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/categories");
    },
    filename: function (req, file, cb) {
        let productID;
        if (req.params.id !== undefined) {
            productID = req.params.id;
        } else {
            productID = req.body.title;
        }
        const ext = file.mimetype.split("/")[1];
        const fileName = `category-ID:${productID}-${Date.now()}.${ext}`;
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
    .get(categoriesControlers.allCategories)
    .post(
        upload.single("avatar"),
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        categoriesControlers.createCategory
    );

router.route("/title/:title").get(categoriesControlers.oneCategory);

router
    .route("/:id")
    .patch(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        upload.single("avatar"),
        categoriesControlers.editCategory
    )
    .delete(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        categoriesControlers.deleteCategory
    )
    .get(categoriesControlers.oneCategory);

module.exports = router;
