const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  category: { type: String, required: true }
})
const categoryModel = mongoose.model("category", categorySchema)
module.exports = categoryModel;