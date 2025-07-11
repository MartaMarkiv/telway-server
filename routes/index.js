const express = require("express");
const authRouter = require("./auth");
const checkAuth = require("../middleware/isAuthenticated");
const userRouter = require("./user");
const paymentRouter = require("./payment");
const webhookRouter = require("./webhook");
const phoneRouter = require("./phone");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/phone", phoneRouter);
router.use("/payment", checkAuth, paymentRouter);
router.use("/webhook", webhookRouter);

module.exports = router;