const stripe = require("../../lib/stripe");

module.exports = async(req, res) => {
  try {
    const { amount, currency = "usd" } = req.body;

    const sendAmount = Math.round(amount * 100);
    console.log("---------  create sheet  ----------   ", sendAmount);


    const customer = await stripe.customers.create();

    const ephemeralKey = await stripe.ephemeralKeys.create( {customer: customer.id},{apiVersion:"2022-11-15"});

    const paymentIntent = await stripe.paymentIntents.create({
      amount: sendAmount,
      currency,
      customer: customer.id,
      automatic_payment_methods: { enabled: true }
    });

    console.log("PaymentIntent ID:", paymentIntent.id);
console.log("ClientSecret:", paymentIntent.client_secret);
console.log("Customer ID:", customer.id, "    ");
console.log("EphemeralKey:", ephemeralKey.secret);

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.VITE_STRIPE_PUBLIC_KEY_1
    });
  } catch (error) {
    console.log("Error happened while creating stripe checkout session: ", error);
    return res.status(500).json({message: error || "Error happened, please try again later"});
  }
}