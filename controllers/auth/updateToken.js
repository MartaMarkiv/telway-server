const jwt = require("jsonwebtoken");
const tokensMethods = require("./tokensMethods");
const UserModel = require("../../models/User");

module.exports = async(req, res) => {
  console.log("req.cookies: ", req.cookies);
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const user = await UserModel.findByToken(token);

  if(!user) {
    console.log("Token is expired");
    return res.status(401).json({message: "Token is expired"});
  }

  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = tokensMethods.createAccessToken({ id: user.id });
    res.json({ accessToken });
  });
};