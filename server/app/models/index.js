const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.product = require("./product.model");
db.categoryModel  = require("./category.model");
db.departmentsModel = require("./department.model");
db.unitsModel = require("./unit.model");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;