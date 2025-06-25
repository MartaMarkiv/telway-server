const stripe = require("../../lib/stripe");

module.exports = async(req, res) => {
  try {
    const { amount, currency = "usd" } = req.body;

    console.log("In create Payment instance: ", req.user);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 1000 * 100) / 100,
      currency,
      metadata: {userId: req.user.id},
      automatic_payment_methods: { enabled: true }
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("Error happened while creating stripe checkout session: ", error);
    return res.status(500).json({message: error || "Error happened, please try again later"});
  }
}