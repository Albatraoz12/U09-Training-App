const express = require('express');
const userSaved = require('../model/userSaved');
const dotenv = require('dotenv').config();
const router = express.Router();

//Crate userList
router.post('/saveEx/:id', (req, res) => {
  try {
    const id = req.params.id;
    const exists = userSaved.findOne({ exId: req.body.exId });

    if (!exists) {
      const newSave = new userSaved({
        name: req.body.name,
        exId: req.body.exId,
        user: id,
      });
      newSave
        .save()
        .then(res.status(200).json({ message: 'The Exercise has been saved' }));
    } else {
      res.status(404).json({ message: 'Exercise is already saved' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
