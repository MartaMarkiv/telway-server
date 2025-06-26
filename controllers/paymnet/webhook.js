// const stripe = require("../../lib/stripe");
const UserModel = require("../../models/User");

module.exports = async(req, res) => {
  try {
    console.log("WEBHOOK");

    const {data} = req.body;
    console.log(data.object);

    const {amount, metadata: {userId}} = data.object;

    const user = await UserModel.findById(userId);
    console.log(user);

    const updatedBalance = user.balance + amount / 1000;

    console.log("updatedBalance: ", updatedBalance);

    await UserModel.updateBalance(userId,updatedBalance);

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log("Error happened in webhook ", error);
    return res.status(500).json({message: error || "Error happened, please try again later"});
  }
}