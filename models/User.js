const mongoose = require("../lib/mongoose");
const Schema = mongoose.Schema;

const User = Schema({
  name: String,
  balance: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    unique: true
  },
  phone: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  refreshToken: String
},
{
  timestamps: true
});

const UserModel = mongoose.model("User", User);

module.exports = {
  model: UserModel,
  create:  (profile) => new UserModel(profile).save(),
  updateToken:  (id, token) => UserModel.findOneAndUpdate({_id: id}, {refreshToken: token}),
  updateBalance:  (id, balance) => UserModel.findOneAndUpdate({_id: id}, {balance}),
  updateUser:  (id, query) => UserModel.findOneAndUpdate({_id: id}, query),
  deleteToken:  (id) => UserModel.findOneAndUpdate({_id: id}, {refreshToken: ""}),
  findByEmail:  (email) => UserModel.findOne({email}),
  findById:  (_id) => UserModel.findOne({_id}),
  findByToken:  (refreshToken) => UserModel.findOne({refreshToken}),
}