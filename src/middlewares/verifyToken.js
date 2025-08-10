const jwt = require("jsonwebtoken");
const { createError } = require("../utils/createError");


exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return next(createError(404, "header is not present !"))

    const token = authHeader.split(' ')[1];

    if (!token) return next(createError(404, "token is not present !"))

    jwt.verify(token, process.env.JWTSECRET, (err, payload) => {
        if (err) return next(createError(404, 'invalid token'))
        req.user = payload;
        next()
    })
}