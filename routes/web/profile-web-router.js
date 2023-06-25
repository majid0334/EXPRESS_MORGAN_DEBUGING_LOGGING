const express = require("express");
const router = express.Router();
const controller = require("../../controllers/web/profile-web-controller");
const { requireAuth } = require("./../../utils/passport");

/* GET auth page. */
router.get("/", requireAuth, controller.home);
router.post("/start-path/:id", requireAuth, controller.startPath);


module.exports = router;
