const getPhones = require("./getPhonesList");
const createOrder = require("./createOrder");
const deletePhone = require("./deletePhone");
const getCountries = require("./getCountries");
const getRegions = require("./getRegions");
const getGroups = require("./getGroups");
const getUserPhones = require("./getUserPhones");

module.exports = {
  getPhones,
  createOrder,
  deletePhone,
  getCountries,
  getRegions,
  getGroups,
  getUserPhones
};