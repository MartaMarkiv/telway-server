const express = require("express");
const checkAuth = require("../middleware/isAuthenticated");
const phoneController = require("../controllers/phoneNumber");

const router = express.Router();

router.get("/list", phoneController.getPhones);
router.get("/countries", phoneController.getCountries);
router.post("/create", phoneController.createPhone);
router.delete("/delete", phoneController.deletePhone);

module.exports = router;
