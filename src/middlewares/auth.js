const { ACCESS_TOKEN_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const bearer = req.headers.authorization?.split(" ")[0];

  try {
    if (!token || bearer !== "Bearer")
      return res.status(403).send({ msg: "No token provided" });
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.verifiedUser = decoded.user;
    next();
  } catch (error) {
    next();
  }
};

module.exports = { authenticate };
