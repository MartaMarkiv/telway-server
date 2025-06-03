const User = require("../../models/User");

module.exports = async(req, res) => {
  try {
    console.log("Get user info: ", req.user._id);
    console.log("Get user info 2: ", req.user.id);
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404);
    return res.status(200).json({user});
  } catch (error) {
    console.log("Error while getting user info: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}