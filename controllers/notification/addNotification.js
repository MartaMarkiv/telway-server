const Notification = require("../../models/Notification");

module.exports = async(req, res) => {
  try {
    const {title, text, user} = req.body;
    const notification = await Notification.create({
      title,
      text,
      user
    });
    console.log(notification);
    if (!notification) return res.status(404);
    return res.status(200).json({message: "Notification successfully created"});
  } catch (error) {
    console.log("Error while creating notification: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}