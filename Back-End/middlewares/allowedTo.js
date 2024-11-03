const httpResponse = require("../utils/httpRespone");

module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return res
                .status(401)
                .json(
                    httpResponse.badResponse(401, "this role is not allowed")
                );
        }
        next();
    };
};
