const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Middleweare, authorize users token
function authorization(req, res, next) {
  const token = req.cookies.access_token;

  console.log("token", token);

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const data = jwt.verify(token, process.env.SECRET);
    req.userId = data.id;
    req.userRole = data.role;
    req.username = data.username;
    return next();
  } catch {
    return res.sendStatus(403);
  }
}

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
