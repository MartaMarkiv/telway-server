const UserModel = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("User's data in login: ", email, "  ", password);
    const user = await UserModel.findByEmail(email);
    console.log("user in db: ", user);
    if(!user) {
      return res.status(400).json({success: false, message: "There is no user with that email."})
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
    if (isMatch) {
        // Create a token
        const token = jwt.sign({ id: user._id, username: user.name }, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token, user });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  } catch (error) {
    console.log("Error while login user: ", error);
    return res.status(500).json({success: false, message: "Error happened."})
  }
}