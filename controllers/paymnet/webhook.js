const stripe = require("../../lib/stripe");

module.exports = async(req, res) => {
  try {
    console.log("WEBHOOK");
    console.log(req.body);

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log("Error happened in webhook ", error);
    return res.status(500).json({message: error || "Error happened, please try again later"});
  }
}