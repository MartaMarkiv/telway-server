const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});



// stripe.customers.create({
//   email: 'customer@example.com',
// })
//   .then(customer => console.log(customer.id))
//   .catch(error => console.error(error));

module.exports = stripe;