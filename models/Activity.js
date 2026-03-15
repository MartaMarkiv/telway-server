const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

const Activity = Schema({
  name: String,
  duration: Number,
  price: Number,
  type: String,
  receiver: String,
  user: { type: Schema.Types.ObjectId, ref: "User" }
},
{
  timestamps: true
});

const ActivityModel = mongoose.model("Activity", Activity);

module.exports = {
  model: ActivityModel,
  create:  (activity) => new ActivityModel(activity).save(),
  findByUser:  (userId) => ActivityModel.findOne({user: userId}),
  findById:  (_id) => ActivityModel.findOne({_id}),
}