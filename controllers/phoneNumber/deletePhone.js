const config = require("../../config/config");
const PhoneNumber = require("../../models/PhoneNumber");

module.exports = async(req, res) => {
  try {
    const {id} = req.body;
    console.log("delte: ");
    console.log(req.body);
    if(!id) {
      return res.status(404).json({message: "Bad request."});
    }

    await PhoneNumber.deleteById(id);

    return res.status(200).json({});
  } catch (error) {
    console.log("Error while deleting number: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}