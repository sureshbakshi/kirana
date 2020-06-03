const mongoose = require("mongoose");
const unitSchema = new mongoose.Schema({
  unit: { type: String, required: true }
})
const unitsModel = mongoose.model("units", unitSchema)
module.exports = unitsModel;