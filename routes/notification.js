const express = require("express");
const notificationController = require("../controllers/notification");

const router = express.Router();

router.post("/add", notificationController.addNotification);
router.patch("/read", notificationController.readNotification);

module.exports = router;
