const express = require("express");
const stripeController = require("../controllers/payment");

const router = express.Router();

router.post("/stripe", stripeController.createPayment);
router.post("/stripe-sheet", stripeController.createSheet);

module.exports = router;