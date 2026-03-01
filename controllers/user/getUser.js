const User = require("../../models/User");
const PhoneNumber = require("../../models/PhoneNumber");

module.exports = async(req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const phones = await PhoneNumber.findByUser(req.user.id);
    if (!user) return res.status(404);
    const {email, _id, name, role, balance, phone} = user;
    return res.status(200).json({user:{email, name, balance, role, id:_id, activeNumbers: phones.length, phone}});
  } catch (error) {
    console.log("Error while getting user info: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}