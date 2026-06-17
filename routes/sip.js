const express = require("express");
const sipController = require("../controllers/sip");

const router = express.Router();

router.get("/credentials", sipController.getCredential);

module.exports = router;
