const express = require('express');
const User = require('../model/user');
const userList = require('../model/userList');
const dotenv = require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');

//Middleweare, authorize users token
const authorization = (req, res, next) => {
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

//@desc Creates a list for a user
//@routes POST /userList/createList/:id
//@access Private
router.post('/createList/:uid', authorization, (req, res) => {
  try {
    const uid = req.params.uid;
    console.log(req.userId);
    console.log(uid);
    if (req.userId === uid) {
      const newList = new userList({
        title: req.body.title,
        user: uid,
        listRole: req.role,
      });
      newList
        .save()
        .then(res.status(200).json({ message: 'new list has been created' }));
    } else {
      res.status(404).json({ ErrorMessage: 'wrong userId' });
    }
  } catch (error) {
    console.log(error);
  }
});

//@desc Gets all list for the userId
//@routes GET /userList/createList/:id
//@access Private
router.get('/:uid', authorization, async (req, res) => {
  try {
    const user = User.findOne({ _id: req.userId });
    if (user) {
      const uid = req.params.uid;
      if (req.userId === uid) {
        const list = await userList.find({ user: uid });
        res.status(200).json({ message: list });
      } else {
        res.status(404).json({ ErrorMessage: 'Wrong crediantials!' });
      }
    } else {
      res.status(404).json({ ErrorMessage: 'You are not an user!' });
    }
  } catch (error) {
    res.status(404).json({ message: 'There is no user in the system' });
  }
});

//@desc Validates if users ID from token == list.user and then updates the list, if it is true
//@routes PUT /userList/editList/:lid
//@access Private
router.put('/editList/:lid', authorization, async (req, res) => {
  try {
    const validUser = await User.findOne({ _id: req.userId });
    const id = req.params.lid;
    if (validUser) {
      const list = await userList.findOne({ _id: id });
      if (list.user == validUser.id) {
        const options = { new: true };
        const editList = await userList.findByIdAndUpdate(
          id,
          req.body,
          options
        );
        res
          .status(200)
          .json({ message: 'List with ID ' + id + ' has now been updated!' });
      } else {
        res.status(404).json({ ErrorMessage: 'You are not the owner!' });
      }
    } else {
      res.status(404).json({ ErrorMessage: 'You are not an user!' });
    }
  } catch (error) {
    res.status(404).json({ message: 'No List with that ID' });
  }
});

//@desc Validates if users ID from token == list.user and then deletes it
//@routes Delete /userList/:id
//@access Private
router.delete('/:id', authorization, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.find({ _id: req.userId });
    console.log(id);
    console.log(user);
    if (user) {
      const list = await userList.findById(id);
      if (list.user == req.userId) {
        list.remove();
        res
          .status(200)
          .json({ message: list.title + ' has now been deletet!' });
      } else {
        res
          .status(404)
          .json({ ErrorMessage: 'You are not the owner of this list!' });
      }
    }
  } catch (error) {
    res.status(404).json({ message: 'Invalid Id!' });
  }
});

module.exports = router;
