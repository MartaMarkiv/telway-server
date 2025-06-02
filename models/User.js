const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

const User = Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  avatar: String,
},
{
  timestamps: true
});

const UserModel = mongoose.model("User", User);

module.exports = {
  model: UserModel,
  create:  (profile) => new UserModel(profile).save(),
  findByEmail:  (email) => UserModel.findOne({email}),
}