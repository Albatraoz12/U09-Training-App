const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8081;
const userRouter = require('./routes/user');
const listRouter = require('./routes/userList');
const listInfoRouter = require('./routes/userListInfo');
const userSaved = require('./routes/userSaved');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.REQUEST_URL,
  })
);

app.use('/user', userRouter);
app.use('/userList', listRouter);
app.use('/userListInfo', listInfoRouter);
app.use('/userSaves', userSaved);

app.get('/', (req, res) => {
  res.send('Hello There! - Obi-Wan, aaahhhh general kanobi!');
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
