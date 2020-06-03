const db = require("../models");
const Product = db.product;
const upload = require("../middlewares/upload");

exports.createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        department: req.body.department,
        category: req.body.category ,
        productItem: req.body.productItem,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        active: req.body.active
      });
      const newProduct = await product.save();
      if (newProduct) {
        return res.status(201).send({ message: 'New Product Created', data: newProduct });
      }
      return res.status(500).send({ message: ' Error in Creating Product.' });
};

exports.deleteProduct = async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: "Product Deleted" });
    } else {
      res.send("Error in Deletion.");
    }
} 

exports.updateProduct =async (req, res) => {

    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
        }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });



}

exports.getProductDetail = async (req, res) => {
        const product = await Product.findOne({ _id: req.params.id });
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: "Product Not Found." });
        }
}

exports.getAllProducts =async (req, res) => {
        const category = req.query.category ? { category: req.query.category } : {};
        const searchKeyword = req.query.searchKeyword ? {
            name: {
                $regex: req.query.searchKeyword,
                $options: 'i'
            }
        } : {};
        const sortOrder = req.query.sortOrder ?
            (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
            :
            { _id: -1 };
        const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
        res.send(products);
}

exports.multipleUpload =async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.files);
    
        if (req.files.length <= 0) {
          return res.status(400).send({ message: 'Please upload atleast one image', data: req.files });
        }
        if (req.files && req.files.length > 0) {
            return res.status(200).send({ message: 'images uploaded sucessfully', data: req.files });
          }
      } catch (error) {
        console.log(error);
    
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
          return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
      }
}