const PhoneNumber = require("../../models/PhoneNumber");
const config = require("../../config/config");

module.exports = async(req, res) => {
   try {
      const phones = await PhoneNumber.findByUser(req.user.id);
      const processingList = phones.filter(item => item.status === "Processing");
      console.log("processingList: ", processingList);
      let updated = 0;
      if(processingList.lenght > 0) {
         processingList.map(async item => {
            if(item.orderId) {
               const response = await fetch(`https://api.idtexpress.com/v1/dids/orders/${item.orderId}`, {
                  headers: {
                  "x-api-key": config.idtKey,
                  "x-api-secret": config.idtSecret
                  }
               });
               if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
               }
               const data = await response.json();
               const {order: {order_items}} = data;
               const {status} = order_items[0];
               await PhoneNumber.updateByOrderId(item.orderId, status);
               updated ++;
            }
         });
      }
      const phonesList = updated ? await PhoneNumber.findByUser(req.user.id) : phones;
      console.log("user phones: ");
      console.log(phonesList);
      return res.status(200).json({list: phonesList});
   } catch (error) {
      console.log("Error while getting user's phones: ", error);
      return res.status(500).json({success: false, message: "Server error"});
  }
}