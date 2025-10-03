const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// console.log("process.env.STRIPE_SECRET_KEY_2:  ", process.env.STRIPE_SECRET_KEY);

module.exports = stripe;