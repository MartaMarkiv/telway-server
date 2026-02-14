const config = require("../../config/config");

module.exports = async(req, res) => {
  try {
    const {group} = req.query;
     const response = await fetch(`${config.idtApiUrl}/did_groups/${group}/browse_numbers`, {
      headers: {
        "x-api-key": config.idtKey,
        "x-api-secret": config.idtSecret
      }
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    const {numbers} = data;
    console.log(numbers);
    return res.status(200).json({numbers});
  } catch (error) {
    console.log("Error while getting phone numbers: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}