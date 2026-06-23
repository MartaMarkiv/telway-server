module.exports = async(req, res) => {
  try {

    console.log("get credential request");
    const wsUrl = process.env.SIP_WS_URL || 'wss://62.171.166.141:5160/wss'; 

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