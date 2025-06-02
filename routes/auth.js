const express = require("express");
const config = require("../config/config");
const User = require("../models/User");

const router = express.Router();

router.post("/google", async (req, res) => {
  console.log(req.body);
  const { tokenId } = req.body;
  console.log("LOGIN REQUESt   ----------   ");

  if (!tokenId) return res.status(400).json({ error: "Token is required" });

  try {
    // Отримуємо інформацію про користувача з Google
    const response = await fetch(`${config.googleAuthUrl}${tokenId}`);
    if (!response.ok) {
      throw new Error(`Invalid token: ${response.statusText}`);
    }

    const data = await response.json();
    // return data; // тут будуть email, name, pi
    // const userData = response.data;

    console.log(data);

    const user = await User.findByEmail(data.email);
    if(user) {
    req.session.userId = user._id; 

      return res.json({
      message: "Successful",
      user: user,
    });
    }

    const createdUser = await User.create({
      email: data.email,
        name: data.name,
        avatar:data.picture,
    });


    req.session.userId = createdUser._id; 

    console.log(createdUser);

    req.user = createdUser;

    // Тут можеш зберегти або оновити користувача в БД

    res.json({
      message: "Authentication successful",
      user: createdUser,
    });
  } catch (err) {
    console.error("Google Auth Error:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
