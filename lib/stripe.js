const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_1);

module.exports = stripe;