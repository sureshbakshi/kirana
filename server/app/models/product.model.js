const mongoose = require("mongoose");
const productItem = new mongoose.Schema({
  price: { type: Number, default: 0, required: true },
  truePrice: { type: Number, default: 0, required: true },
  countInStock: { type: Number, default: 0, required: true },
  quantity: { type: Number, default: 0, required: true },
  unit: { type: String, required: true }
})

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: [{ type: String, required: true }],
  brand: { type: String, required: true },
  department: { 
    id: String,
    label: String,
  },
  category: { 
    id: String,
    label: String,
  },
  productItem:[productItem],
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  active: {type: Boolean, default: false}
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;