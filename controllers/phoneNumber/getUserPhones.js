const PhoneNumber = require("../../models/PhoneNumber");

module.exports = async(req, res) => {
   try {
      const phones = await PhoneNumber.findByUser(req.user.id);
      console.log("user phones: ");
      console.log(phones);
      return res.status(200).json({list: phones});
   } catch (error) {
      console.log("Error while getting user's phones: ", error);
      return res.status(500).json({success: false, message: "Server error"});
  }
}