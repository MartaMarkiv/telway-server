const User = require("../../models/User");

module.exports = async(req, res) => {
  try {
    const userId = req.user.id;
    const query = req.body;
    const updatedUser = await User.updateUser(userId, query);
    console.log("Updated user: ");
    consoel.log(updatedUser);
    const {name, email} = updatedUser;
    return res.status(200).json({user:{email, name}});
  } catch (error) {
    console.log("Error while updating user's details: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}