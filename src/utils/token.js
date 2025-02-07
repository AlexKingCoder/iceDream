const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}

module.exports = { generateToken, verifyToken }