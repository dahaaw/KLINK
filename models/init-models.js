var DataTypes = require("sequelize").DataTypes;
var _payment = require("./payment");
var _product = require("./product");
var _transaction = require("./transaction");
var _transaction_detail = require("./transaction_detail");
var _user = require("./user");

function initModels(sequelize) {
  var payment = _payment(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var transaction = _transaction(sequelize, DataTypes);
  var transaction_detail = _transaction_detail(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    payment,
    product,
    transaction,
    transaction_detail,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
