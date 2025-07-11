const PhoneNumber = require("../../models/PhoneNumber");

const numbers =[
      {
         "number":"0115117304800",
         "status":"active",
         "added_at":"2020-06-24T19:02:30.000Z",
         "did_group":{
            "name":"LIMA",
            "id":11895,
            "country_calling_code":"51",
            "area_code":"1",
            "nxx":null,
            "toll_free":false,
            "country":{
               "name":"PERU",
               "iso":"PE",
               "has_regions":false,
               "supports_toll_free":false
            },
            "fees":{
               "setup_fee":"0.00",
               "monthly_fee":"5.25",
               "per_minute_rate":"4.7354"
            }
         }
      },
      {
         "number":"011557135001442",
         "status":"active",
         "added_at":"2020-06-24T19:02:51.000Z",
         "did_group":{
            "name":"SALVADOR ",
            "id":16847,
            "country_calling_code":"55",
            "area_code":"71",
            "nxx":null,
            "toll_free":false,
            "country":{
               "name":"BRAZIL",
               "iso":"BR",
               "has_regions":false,
               "supports_toll_free":true
            },
            "fees":{
               "setup_fee":"0.00",
               "monthly_fee":"3.00",
               "per_minute_rate":"4.7354"
            }
         }
      },
      {
         "number":"011557135001540",
         "status":"active",
         "added_at":"2020-06-26T07:01:28.000Z",
         "did_group":{
            "name":"SALVADOR ",
            "id":16847,
            "country_calling_code":"55",
            "area_code":"71",
            "nxx":null,
            "toll_free":false,
            "country":{
               "name":"BRAZIL",
               "iso":"BR",
               "has_regions":false,
               "supports_toll_free":true
            },
            "fees":{
               "setup_fee":"0.00",
               "monthly_fee":"3.00",
               "per_minute_rate":"4.7354"
            }
         }
      },
      {
         "number":"011557135001580",
         "status":"active",
         "added_at":"2020-06-26T07:01:28.000Z",
         "did_group":{
            "name":"SALVADOR",
            "id":16847,
            "country_calling_code":"55",
            "area_code":"71",
            "nxx":null,
            "toll_free":false,
            "country":{
               "name":"BRAZIL",
               "iso":"BR",
               "has_regions":false,
               "supports_toll_free":true
            },
            "fees":{
               "setup_fee":"0.00",
               "monthly_fee":"3.00",
               "per_minute_rate":"4.7354"
            }
         }
      }
   ];

module.exports = async(req, res) => {
  try {
    const phones = await PhoneNumber.findByUser(req.user.id);
    console.log(phones);
    const list = numbers.map(item => {
      const {number, status, did_group} = item;
      const {country: {name:country, iso: countryCode}, fees:{monthly_fee: fee}} = did_group;
      return {
         number, status, country, countryCode, fee
      }
    })
    return res.status(200).json({list});
  } catch (error) {
    console.log("Error while getting phone numbers: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}