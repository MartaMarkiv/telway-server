const express = require("express");
const stripeController = require("../controllers/payment");

const router = express.Router();

router.use("/stripe", stripeController.webhook);

module.exports = router;