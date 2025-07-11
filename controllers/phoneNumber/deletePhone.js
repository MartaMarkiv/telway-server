const PhoneNumber = require("../../models/PhoneNumber");

module.exports = async(req, res) => {
  try {
    const {phoneId} = req.body;
    console.log(phoneId);

    if(!phoneId) {
      return res.status(400).json({message: "Missing phone number"});
    }
    await PhoneNumber.deleteById(phoneId);
    if (!phoneNumber) return res.status(404);

    return res.status(200).json({message: "Phone number successfully deleted"});
    
  } catch (error) {
    console.log("Error while deleting phone number: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}