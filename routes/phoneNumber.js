const express = require("express");
const phoneController = require("../controllers/myNumber");

const router = express.Router();

router.get("/list", phoneController.getUserPhones);
router.post("/add", phoneController.addPhoneNumber);
router.delete("/delete", phoneController.deletePhone);

module.exports = router;
