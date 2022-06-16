const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
