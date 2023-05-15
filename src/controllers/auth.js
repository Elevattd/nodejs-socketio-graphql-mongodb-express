const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  generateAccessToken,
  updateRefreshToken,
  verifyRefreshToken,
} = require("../utils/auth");

const signUp = async (req, res, next) => {
  let user;

  try {
    const password = await bcrypt.hash(req.body.password, 10);
    user = {
      username: req.body.username,
      email: req.body.email,
      password,
    };
    const userExists = await User.findOne({ email: user.email });
    userExists
      ? res.status(400).send({ error: `User already exists` })
      : await new User(user).save();

    res.status(201).send({ msg: "Created" });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).send({ error: `User not found` });
    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).send({ error: `Password incorrect` });
    const accessToken = generateAccessToken(user);
    const refreshToken = await updateRefreshToken(user);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.rawHeaders[1];
  const newCookies = cookies.split("=")[1].split(";")[0];
  if (!newCookies) return res.status(401).send({ error: `Unauthorized` });
  const refreshToken = newCookies;
  try {
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(401).send({ error: `Forbiden` });
    let newToken = await verifyRefreshToken(user);
    if (typeof newToken === "string") res.send({ accesToken: newToken });
    else throw newToken; // obj error {status, message}
  } catch (error) {
    next(error);
  }
};

const handleUserSession = async (req, res, next) => {
  const cookies = req.rawHeaders[1];
  const newCookies = cookies.split("=")[1].split(";")[0];
  if (!newCookies) return res.status(401).send({ error: `Unauthorized` });
  const refreshToken = newCookies;
  try {
    const user = await User.findOne({ refreshToken });
    if (!user) return next({ status: 404, message: "Session Inactive" });
    let newToken = await verifyRefreshToken(user);
    if (typeof newToken === "string") {
      return res.send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        accessToken: newToken,
      });
    } else res.status(newToken.status).send(newToken.message);
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  const cookies = req.rawHeaders[1];
  const newCookies = cookies.split("=")[1].split(";")[0];
  if (!newCookies)
    return res.status(401).send({ error: `No token found, unauthorized` });
  const refreshToken = newCookies;
  try {
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204);
    }
    await updateRefreshToken(user, true);
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  handleRefreshToken,
  handleUserSession,
  logOut,
};
