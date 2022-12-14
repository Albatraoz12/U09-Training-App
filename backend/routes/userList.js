const express = require('express');
const User = require('../model/user');
const userList = require('../model/userList');
const dotenv = require('dotenv').config();
const router = express.Router();
const {
  createList,
  getUserList,
  updateList,
  deleteList,
} = require('../controller/userListController');
const { authorization } = require('../authorization/auth');

//@desc Creates a list for a user
//@routes POST /userList/createList/:id
//@access Private
router.post('/createList/:uid', authorization, createList);

//@desc Gets all list for the userId
//@routes GET /userList/createList/:id
//@access Private
router.get('/:uid', authorization, getUserList);

//@desc Validates if users ID from token == list.user and then updates the list, if it is true
//@routes PUT /userList/editList/:lid
//@access Private
router.put('/editList/:lid', authorization, updateList);

//@desc Validates if users ID from token == list.user and then deletes it
//@routes Delete /userList/:id
//@access Private
router.delete('/:id', authorization, deleteList);

module.exports = router;
