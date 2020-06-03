const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema({
  department: { type: String, required: true }
})
const departmentsModel = mongoose.model("Departments", departmentSchema)
module.exports = departmentsModel;