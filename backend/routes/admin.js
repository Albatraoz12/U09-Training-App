const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const {
  adminSignUp,
  getAllUsers,
  getUser,
  updateUser,
  updateUserPassword,
  deleteUser,
} = require('../controller/adminController');
const { authorization } = require('../authorization/auth');

//@desc Create a new user as an admin, checks if req.id has role of admin
//@routes POST /signup
//@access Private
router.post('/signup', authorization, adminSignUp);

//@desc Get all user, checks if req.id has role of admin
//@routes GET /getAllUsers
//@access Private
router.get('/getAllUsers', authorization, getAllUsers);

//@desc Get an user with its ID, checks if req.id has role of admin
//@routes GET /getAllUsers
//@access Private
router.get('/getUser/:uid', authorization, getUser);

//@desc Edit A User Information, checks if req.id has role of admin
//@routes PUT /user/:id/edit
//@access Public
router.put('/editUser/:id/', authorization, updateUser);

//@desc Edit A User password, checks if req.id has role of admin
//@routes PUT /user/:id/edit
//@access Public
router.put('/editPassword/:id', authorization, updateUserPassword);

//@desc Delete A User with a userID, checks if req.id has role of admin
//@routes Delete /deleteUser/:id
//@access Private
router.delete('/deleteUser/:id', authorization, deleteUser);

module.exports = router;
