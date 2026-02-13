const config = require("../../config/config");

module.exports = async(req, res) => {
  try {
    const {code, iso} = req.query;
    if(!iso) {
      return res.status(404).json({message: "Bad request."});
    }

    const baseUrl = `${config.idtApiUrl}/did_groups?country_iso=${iso}`;
    const fetchUrl = code ? `${baseUrl}&region_code=${code}` : baseUrl;
    const response = await fetch(fetchUrl, {
      headers: {
        "x-api-key": config.idtKey,
        "x-api-secret": config.idtSecret
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const {did_groups} = data;

    return res.status(200).json({groups: did_groups});
  } catch (error) {
    console.log("Error while getting groups: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}