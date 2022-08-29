const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Middleweare, authorize users token
const authorization = (req, res, next) => {
  // const token = req.cookies.access_token;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(500).json({ message: 'You are not Authorized!' });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET);
    req.userId = data.id;
    return next();
  } catch {
    return res.status(500).json({ message: 'You have no valid token' });
  }
};
//@desc Authorized a user
//@routes GET /user/protected
//@access Public
router.get('/protected', authorization, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user === null) {
      res.status(400);
      return;
    }

    res.status(200).json({
      user: {
        id: req.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

//@desc Login A User
//@routes POST /user/login
//@access Public
router.post('/signin', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.SECRET
      );

      return res
        .cookie('access_token', token, {
          // httpOnly: true,
          httpOnly: process.env.NODE_ENV == 'production' ? true : false,
          secure: true,
          sameSite: 'none',
        })
        .status(200)
        .json({
          message: user.firstName + ' Signed in successfully',
          token: token,
        });
    } else if (!passwordMatch) {
      res.status(400).json({ message: 'Wrong Password, try again' });
    }
  } else {
    res.status(400).json({ message: 'sorry, could not login' });
  }
});

//@desc Register A User
//@routes POST /user/register
//@access Public
router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 'user',
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save().then(() => {
      res.status(201).json({ message: 'New user has been created!' });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//@desc Logout A User
//@routes Get /user/logout
//@access Public
router.get('/signout', authorization, (req, res) => {
  return res
    .clearCookie('access_token')
    .status(200)
    .json({ message: 'Successfully logged out' });
});

module.exports = router;
