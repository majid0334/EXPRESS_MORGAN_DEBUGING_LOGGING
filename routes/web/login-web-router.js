const express = require("express");
const router = express.Router();
const controller = require("./../../controllers/web/login-web-controller");
const { passport } = require("./../../utils/passport");

/* GET auth page. */
router.get("/", controller.home);
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: {
      type: "danger",
      massage: "Inccorect Usernaame or passowrd",
    },
  }),
  controller.loginUser
);
router.post("/register", controller.registerUser);
module.exports = router;
