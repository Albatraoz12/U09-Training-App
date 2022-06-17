const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const User = require("../model/user");
const userList = require("../model/userList");
