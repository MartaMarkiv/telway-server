const config = require("../../config/config");
const User = require("../../models/User");
const PhoneNumber = require("../../models/PhoneNumber");

module.exports = async(req, res) => {
  try {
    console.log(req.body);
    const {group, number, sku} = req.body;
    if(!group || !number) {
      return res.status(400).json({message: "Bad request."});
    }

    const fetchUrl = `https://api.idtexpress.com/v1/dids/orders`;
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "x-api-key": config.idtKey,
        "x-api-secret": config.idtSecret
      },
      body: JSON.stringify({
        order_items:[{did_group_id: group, did_skus: [sku]}]
      })
    }
  );
    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const {order} = data;

    const {order_items, id: orderId} = order;

    const {status, did_group} = order_items[0];

    console.log("did group  ", did_group);
    ;

    const {
      country: {name: countryName, has_regions},
      region,
      fees
    } = did_group;

    console.log("fees");
    console.log(fees);

    let amount = (Number(fees.setup_fee) + Number(fees.monthly_fee));

    if(user.balance < amount) {
      return res.status(400).json({message: "Not enough balance to purchase this number"});
    }

    const createdPhone = await PhoneNumber.create({
      number: number,
      country: countryName,
      region: has_regions ? region.name : "",
      status: status,
      sku: sku,
      orderId: orderId,
      setupFee: Number(fees.setup_fee),
      monthlyFee:  Number(fees.monthly_fee),
      owner: req.user.id
    });

    console.log("created order phone: ", createdPhone);

    const user = await User.findById(req.user.id);
    console.log("user balance: ", user.balance);

    const updatedUser = await User.updateUser(req.user.id, {balance: user.balance - amount});

    console.log("updatedUser: ");
    console.log(updatedUser);

    return res.status(200).json({amount: updatedUser.amount});
  } catch (error) {
    console.log("Error while creating order: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}