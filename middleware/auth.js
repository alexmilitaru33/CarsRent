const jwt = require('jsonwebtoken');
const invalidTokens = require('../controller/userController').invalidTokens;


exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  // Check if the token is invalid
  if (invalidTokens.has(token)) {
    return res.status(401).send({ message: "Token is invalid" });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: "Insufficient privileges" });
  }
  next();
};
