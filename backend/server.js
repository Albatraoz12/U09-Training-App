const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/user");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8081;
const app = express();
const cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: process.env.REQUEST_URL,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello There! - Obi-Wan, aaahhhh general kanobi!");
});
//Start server function
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
