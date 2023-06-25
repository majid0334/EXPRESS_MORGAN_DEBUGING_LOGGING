const express = require("express");
const router = express.Router();
const controller = require("../../controllers/web/users-web-controller");
const { requireAuth } = require("./../../utils/passport");

/* GET auth page. */
router.get("/:username", requireAuth, controller.home);

module.exports = router;
