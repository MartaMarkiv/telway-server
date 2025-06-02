const express = require("express");

const router = express.Router();

router.get("/info", async (req, res) => {
  try {

  console.log("req.user");
  console.log(req.user);

    const user = req.user;

    res.json({
      message: "User is logedin",
      user,
    });
  } catch (err) {
    console.error("Get user info error:", err.message);
    res.status(500).json({ error: "Get user info error" });
  }
});

module.exports = router;
