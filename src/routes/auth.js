const { Router } = require("express");
const {
  signUp,
  signIn,
  handleRefreshToken,
  handleUserSession,
  logOut,
} = require("../controllers/auth");

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/refresh", handleRefreshToken);
router.get("/user", handleUserSession);
router.get("/logout", logOut);

module.exports = {
  router,
};
