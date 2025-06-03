const express = require("express");
const checkAuth = require("../middleware/isAuthenticated");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/info", checkAuth, userController.getUser);

module.exports = router;
