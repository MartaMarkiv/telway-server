const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

const MyNumber = Schema({
  number: String,
  name: String,
  isFavorite: {
    type: Boolean,
    default: false
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" }
},
{
  timestamps: true
});

const MyNumberModel = mongoose.model("MyNumber", MyNumber);

module.exports = {
  model: MyNumberModel,
  create:  (phone) => new MyNumberModel(phone).save(),
  findByUser:  (userId) => MyNumberModel.find({owner: userId}),
  findById:  (_id) => MyNumberModel.findOne({_id}),
  deleteById:  (_id) => MyNumberModel.deleteOne({_id}),
}