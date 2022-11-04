const express = require('express');
const {
  saveExIntoList,
  fetchExInList,
  deleteInfo,
} = require('../controller/userListInfoController');
const router = express.Router();

// Create ListInfo
router.post('/createInfo/:id', saveExIntoList);

//Read User Lists Information
router.get('/listInfo/:id', fetchExInList);

//Delete User Lists Information
router.delete('/listInfoDelete/:id', deleteInfo);

module.exports = router;
