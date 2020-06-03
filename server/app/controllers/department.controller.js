const db = require("../models");
const Department = db.departmentsModel;

exports.createDepartment = async (req, res) => {
    const department = new Department({
        department: req.body.departmentName ,
    });
    const newDepartment = await department.save();
    if (newDepartment) {
        return res.status(201).send({ message: 'New department Created', data: newDepartment });
    }
    return res.status(500).send({ message: ' Error in Creating department.' });
};

exports.getDepartments = async (req, res) => {
    await Department.find({}, function (err, result) {
        if (err) {
            return res.status(500).send({ message: 'Error occured while fetching list of departments' });
        } else {
            return res.status(200).send({ message: 'List of departments', data: result });
        }
    });
}