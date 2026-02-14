const config = require("../../config/config");
const User = require("../../models/User");

module.exports = async(req, res) => {
  try {
    const {number} = req.query;
    if(!iso) {
      return res.status(404).json({message: "Bad request."});
    }

    const fetchUrl = `${config.idtApiUrl}/dids/numbers/${number}`;
    const response = await fetch(fetchUrl, {
      method: "DELETE",
      headers: {
        "x-api-key": config.idtKey,
        "x-api-secret": config.idtSecret
      },
    }
  );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    const {order} = data;
    console.log(order);

    const {order_items} = order;

    let amount = 0;

    order_items.map(item => {
      amount += (Number(item.fees.setup_fee) + Number(item.fees.monthly_fee));
    });

    return res.status(200).json({});
  } catch (error) {
    console.log("Error while deleting numbers: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}