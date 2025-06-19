const express = require("express");
const stripeController = require("../controllers/paymnet");

const router = express.Router();

router.post("/stripe", stripeController.createPayment);
router.use("/webhook", stripeController.webhook);

module.exports = router;