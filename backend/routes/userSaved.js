const express = require('express');
const dotenv = require('dotenv').config();
const router = express.Router();
const {
  saveEx,
  fetchSaved,
  deleteSavedEx,
  deleteSaved,
} = require('../controller/userSavedController');
const { authorization } = require('../authorization/auth');

// @desc User must send in title and exId to the user ID
// @routes POST /userSaves/saveEx/:id
// @access Private
router.post('/saveEx/:id', authorization, saveEx);

// @desc User must send token which contains its ID to be able to see its saved exercise.
// @routes GET /userSaves/saves/:id
// @access Private
router.get('/saves/:id', authorization, fetchSaved);

// @desc Delete an savedex ID and before deletion, the user must be validated to match params.id.user
// @routes DELETE /userSaves/deletesaved/:id
// @access Private
router.delete('/deletesaved/:id', authorization, deleteSavedEx);

// Route to let users unlike from ExercisePage
router.delete('/deletesaved/:uid/:eid', deleteSaved);

module.exports = router;
