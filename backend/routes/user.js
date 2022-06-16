const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const User = require("../model/user");
const bcrypt = require("bcrypt");

//@desc Register A User
//@routes POST /user/register
//@access Public
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save().then(() => {
      res.status(200).json({ message: "New user has been created! 👏" });
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = router;
