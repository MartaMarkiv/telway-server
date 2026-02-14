const express = require("express");
const phoneController = require("../controllers/phoneNumber");

const router = express.Router();

router.get("/list", phoneController.getPhones);
router.get("/countries", phoneController.getCountries);
router.get("/regions", phoneController.getRegions);
router.get("/groups", phoneController.getGroups);
router.post("/create", phoneController.createOrder);
router.delete("/delete", phoneController.deletePhone);

module.exports = router;
