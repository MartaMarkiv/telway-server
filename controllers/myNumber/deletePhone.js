const MyNumber = require("../../models/MyNumber");

module.exports = async(req, res) => {
  try {
    const {id} = req.body;
    console.log("delete: ");
    console.log(req.body);
    if(!id) {
      return res.status(404).json({message: "Bad request."});
    }

    await MyNumber.deleteById(id);

    return res.status(200).json({});
  } catch (error) {
    console.log("Error while deleting phone number: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}