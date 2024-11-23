//modules
const express = require("express");
const multer = require("multer");
//controlers
const userControlers = require("../controlers/usersCotrolers");
const AuthControlers = require("../controlers/AuthControlers.js");
//middlewares
const verifyToken = require("../middlewares/verifyToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
//utils
const AppError = require("../utils/appError.js");
const allowedTo = require("../middlewares/allowedTo.js");
const { userRoles } = require("../utils/userRols.js");

//recieve images
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/users");
    },
    filename: function (req, file, cb) {
        let userEmail;
        if (req.currentUser !== undefined) {
            userEmail = req.currentUser.email;
        } else {
            userEmail = req.body.email;
        }
        const ext = file.mimetype.split("/")[1];
        const fileName = `user-${userEmail}-${Date.now()}.${ext}`;
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
    .get(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        userControlers.allUsers
    )
    .post(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        userControlers.createUser
    );

router
    .route("/:id")
    .get(verifyToken, verifyRefreshToken, userControlers.oneUser)
    .patch(
        verifyToken,
        verifyRefreshToken,
        upload.single("avatar"),
        userControlers.editUser
    )
    .delete(
        verifyToken,
        verifyRefreshToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        userControlers.deleteUser
    );

router
    .route("/cart/:id")
    .patch(verifyToken, verifyRefreshToken, userControlers.deleteCartProduct);

router
    .route("/create-payment-intent")
    .post(verifyToken, verifyRefreshToken, userControlers.makePayment);

router
    .route("/register")
    .post(upload.single("avatar"), AuthControlers.register);

router.route("/login").post(AuthControlers.login);

module.exports = router;
