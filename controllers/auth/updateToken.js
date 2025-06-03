const jwt = require("jsonwebtoken");
const tokensMethods = require("./tokensMethods");

module.exports = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = tokensMethods.createAccessToken({ id: user.id });
    res.json({ accessToken });
  });
};