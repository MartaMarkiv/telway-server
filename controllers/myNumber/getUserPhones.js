const MyNumber = require("../../models/MyNumber");

module.exports = async(req, res) => {
   try {
      const phonesList = await MyNumber.findByUser(req.user.id);
      console.log("user created phones: ");
      console.log(phonesList);
      return res.status(200).json({list: phonesList});
   } catch (error) {
      console.log("Error while getting user's phones: ", error);
      return res.status(500).json({success: false, message: "Server error"});
  }
}