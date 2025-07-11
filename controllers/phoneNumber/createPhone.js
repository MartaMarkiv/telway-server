const PhoneNumber = require("../../models/PhoneNumber");

//TEST DATA

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const countries = ["United States","United Kingdom", "Germany","Austria","Canada","Poland","France"];
const phoneTypes = ["Mobile","Landline","Toll-Free"];

module.exports = async(req, res) => {
  try {
    const phone = {
      number: `+1 ${getRandomInt(7)}${getRandomInt(9)}${getRandomInt(9)}-${getRandomInt(9)}23-4567`,
      country: countries[getRandomInt(6)],
      typeNumber: phoneTypes[getRandomInt(2)],
      expires: new Date(2025, 12),
      status: "active",
      fee: getRandomInt(6) + Math.random(),
      owner: req.user.id
    }
    const phoneNumber = await PhoneNumber.create(phone);
    console.log(phoneNumber);
    if (!phoneNumber) return res.status(404);
    return res.status(200).json({message: "Phone number successfully created"});
  } catch (error) {
    console.log("Error while creating phone number: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}