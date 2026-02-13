const config = require("../../config/config");

module.exports = async(req, res) => {
  try {
    const {code} = req.query;
    const response = await fetch(`${config.idtApiUrl}/countries/${code}/regions`, {
      headers: {
        "x-api-key": config.idtKey,
        "x-api-secret": config.idtSecret
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const {regions} = data;

    return res.status(200).json({regions});
  } catch (error) {
    console.log("Error while getting regions: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}