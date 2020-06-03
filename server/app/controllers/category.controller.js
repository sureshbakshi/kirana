const db = require("../models");
const Category = db.categoryModel;
const constants =  require("../util/constants")
exports.createCategory = async (req, res) => {
    const category = new Category({
        category: req.body.categoryName,
        department: req.body.departmentId || constants.DEFAULT_DEPARTMENT
    });
    const newCategory = await category.save();
    if (newCategory) {
        return res.status(201).send({ message: 'New category Created', data: newCategory });
    }
    return res.status(500).send({ message: ' Error in Creating category.' });
};

exports.getCategories = async (req, res) => {
    await Category.find({}, function (err, result) {
        if (err) {
            return res.status(500).send({ message: 'Error occured while fetching list of categories' });
        } else {
            return res.status(200).send({ message: 'List of categories', data: result });
        }
    });
}