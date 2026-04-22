const MyNumber = require("../../models/MyNumber");

module.exports = async(req, res) => {
  try {
    console.log(req.body);
    const {name, number, isFavorite} = req.body;
    if(!number || !name) {
      return res.status(400).json({message: "Bad request."});
    }

    const createdPhone = await MyNumber.create({
      number: number,
      name: countryName,
      isFavorite: !!isFavorite
    });

    console.log("createdPhone: ", createdPhone);

    return res.status(200).json({message: "Phone has successfully created."});
  } catch (error) {
    console.log("Error while adding phone: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}