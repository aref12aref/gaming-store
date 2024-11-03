const jwt = require("jsonwebtoken");

generateAccessToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.jwt_secret_key, {
        expiresIn: "5m",
    });
    return token;
};

generateRefreshToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.jwt_secret_refresh_key, {
        expiresIn: "1y",
    });
    return token;
};

module.exports = { generateAccessToken, generateRefreshToken };
