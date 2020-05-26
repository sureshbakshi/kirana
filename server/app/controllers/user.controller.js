const db = require("../models");
const User = db.user;
const {updateUser} = require("../controllers/auth.controller")
const {encryptData} = require("../util")
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.updateUserInfo =async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user) {
      user.username = req.body.username,
      user.email = req.body.email,
      user.password = encryptData(req.body.password, 8)
    }

    updateUser(user, req, res)
  };