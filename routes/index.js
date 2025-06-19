const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const paymentRouter = require("./payment");
const checkAuth = require("../middleware/isAuthenticated");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/payment", checkAuth, paymentRouter);

module.exports = router;