const config = require("../../config/config");
const User = require("../../models/User");
const PhoneNumber = require("../../models/PhoneNumber");

module.exports = async(req, res) => {
  try {
    const {group, number} = req.query;
    if(!iso) {
      return res.status(404).json({message: "Bad request."});
    }

    const fetchUrl = `${config.idtApiUrl}/dids/orders`;
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "x-api-key": config.idtKey,
        "x-api-secret": config.idtSecret
      },
      body: JSON.stringify({
        order_items:[{did_group_id: group, did_skus: [number.sku]}]
      })
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

    const {status, ordered: {numbers}, did_group} = order_items[0];

    const {
      country: {name: countryName},
      region,
      fees
    } = did_group;

    const createdPhone = await PhoneNumber.create({
      number: numbers[0].number,
      country: countryName,
      region: region.name || "",
      status: status,
      sku: numbers[0].sku,
      setupFee: Number(fees.setup_fee),
      monthlyFee:  Number(fees.monthly_fee),
      owner: req.user.id
    });

    console.log("createdPhone: ", createdPhone);

    const user = await User.findById(req.user.id);
    console.log("user balance: ", user.balance);

    const updatedUser = await User.updateUser(req.user.id, {balance: user.balance - amount});

    console.log("updatedUser: ");
    console.log(updatedUser);

    return res.status(200).json({groups: did_groups});
  } catch (error) {
    console.log("Error while creating order: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}