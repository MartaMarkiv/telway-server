const express = require("express");
const checkAuth = require("../middleware/isAuthenticated");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/info", checkAuth, userController.getUser);
router.patch("/update", checkAuth, userController.updateUser);

module.exports = router;
