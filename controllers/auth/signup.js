const UserModel = require("../../models/User");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await UserModel.findByEmail(email);
    if(user) {
      return res.status(400).json({success: false, message: "This email already used."})
    }

    await UserModel.create({email, name, password: bcrypt.hashSync(password, 8)});
    return res.status(200).json({success: true, message: "User successfully created."})
  } catch (error) {
    console.log("Error while signup user: ", error);
    return res.status(500).json({success: false, message: "Error happened."})
  }
}