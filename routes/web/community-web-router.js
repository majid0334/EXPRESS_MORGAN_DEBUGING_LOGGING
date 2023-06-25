const express = require("express");
const router = express.Router();
const controller = require("../../controllers/web/community-web-controller.js");
const { requireAuth } = require("./../../utils/passport");

/* GET auth page. */
router.get("/", requireAuth, controller.home);



module.exports = router;
