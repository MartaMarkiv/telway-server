const User = require("../../models/User");

module.exports = async(req, res) => {
  try {
    console.log("Get user info 2: ", req.user.id);
    console.log(req.user);
    const user = await User.findById(req.user.id).select('-password');
    console.log("FOunded user: ")
    console.log(user);
    if (!user) return res.status(404);
    const {email, _id, name, role, balance, activeNumbers} = user;
    return res.status(200).json({user:{email, name, balance, role, id:_id, activeNumbers}});
  } catch (error) {
    console.log("Error while getting user info: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}