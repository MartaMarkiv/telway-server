const express = require("express");
const authRouter = require("./auth");
const checkAuth = require("../middleware/isAuthenticated");
const userRouter = require("./user");
const paymentRouter = require("./payment");
const webhookRouter = require("./webhook");
const phoneRouter = require("./phone");
const myPhoneRouter = require("./phoneNumber");
const notificationRouter = require("./notification");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/phone", checkAuth, phoneRouter);
router.use("/number", checkAuth, myPhoneRouter);
router.use("/payment", checkAuth, paymentRouter);
router.use("/webhook", webhookRouter);
router.use("/notification", notificationRouter);

module.exports = router;