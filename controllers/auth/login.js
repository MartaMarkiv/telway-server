const UserModel = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenMethods = require("./tokensMethods");

module.exports =  async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("User's data in login: ", email, "  ", password);
    const user = await UserModel.findByEmail(email);
    console.log("user in db: ", user);
    if(!user) {
      return res.status(400).json({success: false, message: "There is no user with that email."})
    }

    bcrypt.compare(password, user.password, async(err, isMatch) => {
    if (isMatch) {
        const accessToken = tokenMethods.createAccessToken({ id: user._id });
        const refreshToken = tokenMethods.createRefreshToken({ id: user._id });

        await UserModel.updateToken(user._id, refreshToken);

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          path: '/api/auth/refresh-token',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ accessToken, user: {
          email: user.email,
          name: user.name,
          id: user._id,
          role: user.role
        } });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  } catch (error) {
    console.log("Error while login user: ", error);
    return res.status(500).json({success: false, message: "Error happened."})
  }
}