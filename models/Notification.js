const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

const Notification = Schema({
  title: String,
  text: String,
  status: {enum: ["active", "inactive"], default: "active"},
  user: { type: Schema.Types.ObjectId, ref: "User" },
},
{
  timestamps: true
});

const NotificationModel = mongoose.model("PhoneNumber", Notification);

module.exports = {
  model: NotificationModel,
  create:  (notification) => new NotificationModel(notification).save(),
  findActive:  (userId) => NotificationModel.find({user: userId, status: "active"}),
  findAllByUser:  (userId) => NotificationModel.find({user: userId}),
  findById:  (_id) => NotificationModel.findOne({_id}),
  deleteById:  (_id) => NotificationModel.deleteOne({_id}),
  disableMany:  (ids) => NotificationModel.updateMany(
    {
      _id: { $in: ids }
    },
    {
      $set: { status: "inactive" }
    })
}