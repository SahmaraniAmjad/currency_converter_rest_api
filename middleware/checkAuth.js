const jwt = require("jsonwebtoken");
require('dotenv/config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Authentication failed",
    });
  }
};