const config = require("config");
const jwt = require("jsonwebtoken");

function httpAuth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).send("Access denied. No token provided.");

    try {
      jwt.verify(token, config.get("jwtPrivateKey"));
      next();
    } catch (error) {
      return res.status(400).send("Access denied. Invalid token.");
    }
}

module.exports = httpAuth;