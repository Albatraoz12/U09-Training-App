const express = require("express");
const userListInfo = require("../model/userListInfo");
const userList = require("../model/userList");
const dotenv = require("dotenv").config();
const router = express.Router();

//Create ListInfo
router.post("/createInfo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newList = new userListInfo({
      name: req.body.name,
      description: req.body.description,
      bodyPart: req.body.bodyPart,
      target: req.body.target,
      exId: req.body.exId,
      gifUrl: req.body.gifUrl,
      equipment: req.body.equipment,
      uList: id,
    });
    newList
      .save()
      .then(
        res.status(200).json({ message: "Exercise has been added to list" })
      );
  } catch (error) {
    res.status(404).json({ message: "Invalid Information, try again" });
  }
});

//Read User Lists Information
router.get("/listInfo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const lInfo = await userListInfo.find({ uList: id });
    res.status(200).json({ lInfo });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//Delete User Lists Information
router.delete("/listInfoDelete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await userListInfo.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Exercise has now been deletet from list!" });
  } catch (error) {
    res.status(404).json({ message: "Invalid Id!" });
  }
});

module.exports = router;
