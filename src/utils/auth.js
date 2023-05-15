const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../../config");
const { User } = require("../models");

const generateAccessToken = (user) => {
  return jwt.sign({ user }, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const updateRefreshToken = async (user, errase = false) => {
  let token;
  errase
    ? (token = "")
    : (token = jwt.sign(
        {
          UserInfo: {
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      ));
  await User.findOneAndUpdate({ email: user.email }, { refreshToken: token });
  return token;
};

const verifyRefreshToken = async (user) => {
  const token = user.refreshToken;
  console.log("token", token);
  let newToken = "";
  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
    let decodedUserInfo = decoded;
    if (err || user.name !== decodedUserInfo.UserInfo.name)
      newToken = {
        status: 403,
        message: `You don't have access. Token no longer valid`,
      };
    else newToken = generateAccessToken(user);
  });
  return newToken;
};

module.exports = {
  generateAccessToken,
  updateRefreshToken,
  verifyRefreshToken,
};
