const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

const PhoneNumber = Schema({
  number: String,
  country: String,
  region: String,
  status: String,
  orderId: String,
  sku: String,
  setupFee: Number,
  monthlyFee: Number,
  owner: { type: Schema.Types.ObjectId, ref: "User" }
},
{
  timestamps: true
});

const PhoneNumberModel = mongoose.model("PhoneNumber", PhoneNumber);

module.exports = {
  model: PhoneNumberModel,
  create:  (phone) => new PhoneNumberModel(phone).save(),
  findByUser:  (userId) => PhoneNumberModel.find({owner: userId}),
  findById:  (_id) => PhoneNumberModel.findOne({_id}),
  deleteById:  (_id) => PhoneNumberModel.deleteOne({_id}),
  updateByOrderId:  (orderId, status) => PhoneNumberModel.findOneAndUpdate({orderId}, {status}, { new: true })
}