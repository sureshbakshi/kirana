const db = require("../models");
const Unit = db.unitsModel;

exports.createUnit = async (req, res) => {
    const unit = new Unit({
        unit: req.body.unit ,
    });
    const newUnit = await unit.save();
    if (newUnit) {
        return res.status(201).send({ message: 'New unit Created', data: newUnit });
    }
    return res.status(500).send({ message: ' Error in Creating unit.' });
};

exports.getUnits = async (req, res) => {
    await Unit.find({}, function (err, result) {
        if (err) {
            return res.status(500).send({ message: 'Error occured while fetching list of units' });
        } else {
            return res.status(200).send({ message: 'List of units', data: result });
        }
    });
}