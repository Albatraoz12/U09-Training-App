const express = require('express');
const userSaved = require('../model/userSaved');
const User = require('../model/user');
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
    req.role = data.role;
    return next();
  } catch {
    return res.status(403).json({ message: 'You have no valid token' });
  }
};

// @desc User must send in title and exId to the user ID
// @routes POST /userSaves/saveEx/:id
// @access Private
router.post('/saveEx/:id', authorization, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (user) {
      const id = req.params.id;
      if (req.userId == id) {
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
            .then(
              res.status(200).json({ message: 'The Exercise has been saved' })
            );
        } else {
          res.json({ errorMessage: 'Exercise is already saved' });
        }
      } else {
        res.status(404).json({ errorMessage: 'You are not the user!' });
      }
    } else {
      res.status(404).json({ errorMessage: 'You are not an valid user!' });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc User must send token which contains its ID to be able to see its saved exercise.
// @routes GET /userSaves/saves/:id
// @access Private
router.get('/saves/:id', authorization, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (user) {
      const id = req.params.id;
      if (req.userId == id) {
        const sInfo = await userSaved.find({ user: id });
        res.status(200).json({ sInfo });
      } else {
        res.status(404).json({ errorMessage: 'You are not the user' });
      }
    } else {
      res.status(404).json({ errorMessage: 'You are not an valid user!' });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// @desc Delete an savedex ID and before deletion, the user must be validated to match params.id.user
// @routes DELETE /userSaves/deletesaved/:id
// @access Private
router.delete('/deletesaved/:id', authorization, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (user) {
      const id = req.params.id;
      const list = await userSaved.findOne({ _id: id });
      if (req.userId == list.user) {
        await userSaved.findByIdAndDelete(id);
        res
          .status(200)
          .json({ message: 'Saved exercise has now been deleteted!' });
      } else {
        res.status(404).json({ errorMessage: 'You are not the user' });
      }
    } else {
      res.status(404).json({ errorMessage: 'You are not an valid user!' });
    }
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
