const stripe = require("../../lib/stripe");
const UserModel = require("../../models/User");
const updateUserAmount = require("../socket/socketController");

module.exports = async(req, res) => {
  try {
    console.log("UPDATED WEBHOOK");
    const signature = req.headers["stripe-signature"];
    console.log(signature);

    let event = {};
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.ENDPOINT_SECRET
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    const {data} = event;
    console.log(data.object);

    const {amount, metadata: {userId}} = data.object;

    const user = await UserModel.findById(userId);
    console.log(user);

    const updatedBalance = user.balance + amount / 100;

    console.log("updatedBalance: ", updatedBalance);

    await UserModel.updateBalance(userId,updatedBalance);

    //TO DO: CREATE ACTIVITY. CHECK CREDIT CARD NUMBER

    updateUserAmount(userId, updatedBalance);

    return res.status(200).json({ message: "Success", received: true });
  } catch (error) {
    console.log("Error happened in webhook ", error);
    return res.status(500).json({message: error || "Error happened, please try again later"});
  }
}