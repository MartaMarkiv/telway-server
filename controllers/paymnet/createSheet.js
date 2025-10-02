const stripe = require("../../lib/stripe");

module.exports = async(req, res) => {
  try {
    const { amount, currency = "usd" } = req.body;

    const sendAmount = Math.round(amount * 1000 * 100) / 1000;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: sendAmount,
      currency,
      metadata: {userId: req.user.id},
      automatic_payment_methods: { enabled: true }
    });

    const ephemeralKey = await stripe.ephemeralKeys.create();
    console.log("ephemeralKey: ");
    console.log(ephemeralKey);

    return res.status(200).json({ clientSecret: paymentIntent.client_secret, ephemeralKey: ephemeralKey.secret, });
  } catch (error) {
    console.log("Error happened while creating stripe checkout session: ", error);
    return res.status(500).json({message: error || "Error happened, please try again later"});
  }
}