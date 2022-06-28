const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Middleweare, authorize users token
const authorization = (req, res, next) => {
  //const token = req.cookies.access_token;
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

//@desc Create a new user as an admin
//@routes POST /signup
//@access Private
router.post('/signup', authorization, async (req, res) => {
  try {
    if (req.role === 'admin') {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      user.save().then(() => {
        res.status(200).json({ message: 'New user has been created!' });
      });
    } else {
      res.status(404).json({ message: 'You are not a jedi' });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//@desc Get all user
//@routes GET /getAllUsers
//@access Private
router.get('/getAllUsers', authorization, async (req, res) => {
  try {
    if (req.role === 'admin') {
      const users = await User.find();
      res.status(200).json({ users });
    } else {
      res.status(404).json({ message: 'You are not a jedi' });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//@desc Delete A User with a userID
//@routes Delete /deleteUser/:id
//@access Private
router.delete('/deleteUser/:id', authorization, async (req, res) => {
  try {
    if (req.role === 'admin') {
      const id = req.params.id;
      const user = await User.findById(id);
      user.remove();
      return res
        .status(200)
        .json({ message: 'User has been deleted successfully' });
    } else {
      return res.status(404).json({ message: 'You are not a jedi' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
