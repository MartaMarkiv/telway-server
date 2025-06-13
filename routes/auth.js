const express = require("express");
const authController = require("../controllers/auth");
const checkAuth = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/logout", checkAuth, authController.logout);
router.post("/refresh-token", authController.updateToken);

module.exports = router;
