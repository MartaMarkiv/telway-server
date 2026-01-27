const config = require("../../config/config");

module.exports = async(req, res) => {
  try {
    const response = await fetch(`${config.idtApiUrl}/countries`, {
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

    const {countries} = data;

    return res.status(200).json({countries});
  } catch (error) {
    console.log("Error while getting countries: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}