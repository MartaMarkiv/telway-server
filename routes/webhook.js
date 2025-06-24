const express = require("express");
const stripeController = require("../controllers/paymnet");

const router = express.Router();

router.use("/stripe", stripeController.webhook);

module.exports = router;