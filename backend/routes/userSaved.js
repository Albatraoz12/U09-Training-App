const express = require('express');
const userSaved = require('../model/userSaved');
const dotenv = require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');

//Middleweare, authorize users token
const authorization = (req, res, next) => {
  // const token = req.cookies.access_token;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'You are not Authorized!' });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET);
    req.userId = data.id;
    return next();
  } catch {
    return res.status(403).json({ message: 'You have no valid token' });
  }
};

// Save exercise
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

//Delete User Saved Exercise from Dashboard
router.delete('/deletesaved/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await userSaved.findByIdAndDelete(id);
    res.status(200).json({ message: 'Saved exercise has now been deleteted!' });
  } catch (error) {
    res.status(404).json({ message: 'Invalid Id!' });
  }
});

// Route to let users unlike from ExercisePage
router.delete('/deletesaved/:uid/:eid', async (req, res) => {
  try {
    const uid = req.params.uid;
    const eid = req.params.eid;
    const user = await userSaved.findOne({ user: uid, exId: eid });
    await userSaved.deleteOne(user);
    res.status(200).json({ message: 'Saved exercise has now been deleteted!' });
  } catch (error) {
    res.status(404).json({ message: 'Invalid Id!' });
  }
});
module.exports = router;
