const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const User = require("../model/user");
const userList = require("../model/userList");

//Crate userList
router.post("/createList", (req, res) => {
  try {
    const newList = new userList({
      title: req.body.title,
      user: req.body.user,
    });
    newList
      .save()
      .then(res.status(200).json({ message: "new list has been created" }));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
