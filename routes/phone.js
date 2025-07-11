const express = require("express");
const checkAuth = require("../middleware/isAuthenticated");
const phoneController = require("../controllers/phoneNumber");

const router = express.Router();

router.get("/list", checkAuth, phoneController.getPhones);
router.post("/create", checkAuth, phoneController.createPhone);
router.delete("/delete", checkAuth, phoneController.deletePhone);

module.exports = router;
