const express = require("express");
const User = require("../model/user");
const userList = require("../model/userList");
const dotenv = require("dotenv").config();
const router = express.Router();

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

//Get userlists by userID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const list = await userList.find({ user: id });
    res.status(200).json({ message: list });
  } catch (error) {
    res.status(404).json({ message: "There is no user in the system" });
  }
});

module.exports = router;
