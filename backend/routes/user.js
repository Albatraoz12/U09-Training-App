const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const {
  identify,
  signIn,
  signUp,
  signOut,
} = require('../controller/userController');
const { authorization } = require('../authorization/auth');

//@desc Authorized a user
//@routes GET /user/protected
//@access Public
router.get('/protected', authorization, identify);

//@desc Login A User
//@routes POST /user/login
//@access Public
router.post('/signin', signIn);

//@desc Register A User
//@routes POST /user/register
//@access Public
router.post('/signup', signUp);

//@desc Logout A User
//@routes Get /user/logout
//@access Public
router.get('/signout', authorization, signOut);

module.exports = router;
