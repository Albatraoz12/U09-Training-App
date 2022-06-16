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

//@desc Login A User
//@routes POST /user/login
//@access Public
router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET
      );

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          // secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({
          message: "Logged in successfully " + user.firstName,
          token: token,
        });
    } else if (!passwordMatch) {
      res.json({ message: "Wrong Password, try again" });
    }
  } else {
    res.json({ message: "sorry, could not login" });
  }
});

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
