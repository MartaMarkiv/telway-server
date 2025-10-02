const stripe = require("../../lib/stripe");

module.exports = async(req, res) => {
  try {
    const { amount, currency = "usd" } = req.body;


    const sendAmount = Math.round(amount * 100);
    console.log("---------  create sheet  ----------   ", sendAmount);


    const customer = await stripe.customers.create();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: sendAmount,
      currency,
      customer: customer.id,
      metadata: {userId: req.user.id || "guest"},
      automatic_payment_methods: { enabled: true }
    });

    const ephemeralKey = await stripe.ephemeralKeys.create( {customer: customer.id},{apiVersion:"2022-11-15"});

    return res.status(200).json({ clientSecret: paymentIntent.client_secret, ephemeralKey: ephemeralKey.secret, customer: customer.id});
  } catch (error) {
    console.log("Error happened while creating stripe checkout session: ", error);
    return res.status(500).json({message: error || "Error happened, please try again later"});
  }
}