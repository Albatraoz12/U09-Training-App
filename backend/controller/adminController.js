const User = require('../model/user');
const bcrypt = require('bcrypt');

const adminSignUp = async (req, res) => {
  try {
    const isUser = await User.findOne({ _id: req.userId });
    if (!isUser) return res.status(404).json({ error: 'You are no user' });
    if (req.role === 'admin') {
      const { firstName, lastName, email, password } = req.body;
      User.findOne({ email: email }, (err, user) => {
        if (user) {
          return res.status(201).json({
            failedMessage: 'user already exist',
          });
        }
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          role: 'user',
          email: email,
          password: password,
        });
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        newUser.save().then(() => {
          res.status(201).json({
            message: 'New user has been created!',
          });
        });
      });
    } else {
      res.status(401).json({ message: 'You are not a jedi' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const isUser = await User.findOne({ _id: req.userId });
    if (!isUser) return res.status(404).json({ error: 'You are no user' });
    console.log(req.role);
    if (req.role === 'admin') {
      const users = await User.find();
      res.status(200).json({ users });
    } else {
      res.status(401).json({ message: 'You are not a jedi' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUser = async (req, res) => {
  try {
    const isUser = await User.findOne({ _id: req.userId });
    if (!isUser) return res.status(404).json({ error: 'You are no user' });
    if (req.role === 'admin') {
      const uid = req.params.uid;
      const userData = await User.findById(uid);
      res.status(200).json({ userData });
    } else {
      res.status(401).json({ message: 'You are not a jedi' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const isUser = await User.findOne({ _id: req.userId });
    if (!isUser) return res.status(404).json({ error: 'You are no user' });
    if (req.role === 'admin') {
      const id = req.params.id;
      const update = req.body;
      const options = { new: true };
      const user = await User.findByIdAndUpdate(id, update, options);
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: 'You are not a jedi' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Could not update User' });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const isUser = await User.findOne({ _id: req.userId });
    if (!isUser) return res.status(404).json({ error: 'You are no user' });
    if (req.role === 'admin') {
      const id = req.params.id;
      const update = req.body;
      update.password = bcrypt.hashSync(update.password, 10);
      const options = { new: true };
      const user = await User.findByIdAndUpdate(id, update, options);
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: 'You are not a jedi' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Could not update User' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const isUser = await User.findOne({ _id: req.userId });
    if (!isUser) return res.status(404).json({ error: 'You are no user' });
    if (req.role === 'admin') {
      const id = req.params.id;
      const user = await User.findById(id);
      user.remove();
      return res
        .status(200)
        .json({ message: 'User has been deleted successfully' });
    } else {
      return res.status(401).json({ message: 'You are not a jedi' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  adminSignUp,
  getAllUsers,
  getUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
