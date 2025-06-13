const User = require("../../models/User");

module.exports = async(req, res) => {
  try {
    console.log("BEFORE LOGOUT");
    console.log(res.cookies);
    console.log(req.user);
    console.log(req.cookies.refreshToken);

    console.log("in logout: ", req.user.id);

    await User.deleteToken(req.user.id);
    await res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error: ", error);
    return res.status(500).json({ message: "Logged out failed." });
  }
}