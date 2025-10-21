const Notification = require("../../models/Notification");

module.exports = async(req, res) => {
  try {
    const {ids} = req.body;
    await Notification.disableMany(ids);
    return res.status(200).json({message: "Notification successfully updated"});
  } catch (error) {
    console.log("Error while updating notification: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}