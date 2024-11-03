//modules
const express = require("express");
const multer = require("multer");
//controlers
const productsControlers = require("../controlers/productsControlers");
//utils
const { userRoles } = require("../utils/userRols");
//middlewares
const verifyToken = require("../middlewares/verifyToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const allowedTo = require("../middlewares/allowedTo");

//recieve images
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/products");
    },
    filename: function (req, file, cb) {
        let productID;
        if (req.params.id !== undefined) {
            productID = req.params.id;
        } else {
            productID = req.body.title;
        }
        const ext = file.mimetype.split("/")[1];
        const fileName = `product-ID:${productID}-${Date.now()}.${ext}`;
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
    .get(productsControlers.allProducts)
    .post(
        upload.single("avatar"),
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        productsControlers.createProduct
    );

router
    .route("/:id")
    .get(productsControlers.oneProduct)
    .patch(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        upload.single("avatar"),
        productsControlers.editProduct
    )
    .delete(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        productsControlers.deleteProduct
    );

module.exports = router;
