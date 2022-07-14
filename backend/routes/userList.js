const express = require('express');
const User = require('../model/user');
const userList = require('../model/userList');
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
//Crate userList
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

//Get userlists by userID
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

//Edit user list with userId
router.put('/editList/:lid', authorization, async (req, res) => {
  try {
    const validUser = User.findOne({ _id: req.userId });
    const id = req.params.lid;
    if (validUser) {
      const options = { new: true };
      const editList = await userList.findByIdAndUpdate(id, req.body, options);
      res
        .status(200)
        .json({ message: 'List with ID ' + id + ' has now been updated!' });
    } else {
      res.status(404).json({ ErrorMessage: 'You are not an user!' });
    }
  } catch (error) {
    res.status(404).json({ message: 'No List with that ID' });
  }
});

//Delete userList by Id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const list = await userList.findById(id);
    list.remove();
    res.status(200).json({ message: 'User List has now been deletet!' });
  } catch (error) {
    res.status(404).json({ message: 'Invalid Id!' });
  }
});

module.exports = router;
