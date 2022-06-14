const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8081;
const app = express();

const startServer = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server up and running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

//server connection starts here
mongoose.connect(process.env.DATABASE_URL).then(() => {
  startServer(PORT);
});
