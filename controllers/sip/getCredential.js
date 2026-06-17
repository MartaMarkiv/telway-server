const PhoneNumber = require("../../models/PhoneNumber");
const config = require("../../config/config");

module.exports = async(req, res) => {
  try {
    const wsUrl = process.env.SIP_WS_URL || 'ws://62.171.166.141:8088/ws'; 

    return res.status(200).json({
      sipUri: 'client1',
      sipPassword: 'Rdbntym123',
      sipDomain: '62.171.166.141',
      wsUrl: wsUrl
    });
    } catch (error) {
      console.log("Error while getting sip credentials: ", error);
      return res.status(500).json({success: false, message: "Error while getting sip credentials"});
  }
}