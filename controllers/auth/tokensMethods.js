const jwt = require("jsonwebtoken");

module.exports = {
  createAccessToken : (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  },
  createRefreshToken : (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  }
}