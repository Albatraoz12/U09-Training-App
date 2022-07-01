const express = require('express');
const userSaved = require('../model/userSaved');
const dotenv = require('dotenv').config();
const router = express.Router();

//Crate userList
router.post('/saveEx/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const exist = await userSaved.findOne({
      user: id,
      exId: req.body.exId,
    });
    if (exist === null) {
      const newSave = new userSaved({
        name: req.body.name,
        exId: req.body.exId,
        user: id,
      });
      newSave
        .save()
        .then(res.status(200).json({ message: 'The Exercise has been saved' }));
    } else {
      res.json({ errorMessage: 'Exercise is already saved' });
    }
  } catch (error) {
    console.log(error);
  }
});

//Read User saved exercises
router.get('/saves/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const sInfo = await userSaved.find({ user: id });
    res.status(200).json({ sInfo });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//Delete User Saved Exercise
router.delete('/deletesaved/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await userSaved.findByIdAndDelete(id);
    res.status(200).json({ message: 'Saved exercise has now been deleteted!' });
  } catch (error) {
    res.status(404).json({ message: 'Invalid Id!' });
  }
});
module.exports = router;
