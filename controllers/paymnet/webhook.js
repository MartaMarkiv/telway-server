// const stripe = require("../../lib/stripe");

module.exports = async(req, res) => {
  try {
    console.log("WEBHOOK");

    const {data} = req.body;
    console.log(data);
    console.log("-------------------------------------------------------------");
    console.log(data.object);

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log("Error happened in webhook ", error);
    return res.status(500).json({message: error || "Error happened, please try again later"});
  }
}