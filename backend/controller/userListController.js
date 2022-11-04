const User = require('../model/user');
const userList = require('../model/userList');

const getUserList = async (req, res) => {
  try {
    const user = User.findOne({ _id: req.userId });
    if (user) {
      const uid = req.params.uid;
      if (req.userId === uid) {
        const list = await userList.find({ user: uid });
        res.status(200).json({ message: list });
      } else {
        res.status(401).json({ ErrorMessage: 'Wrong crediantials!' });
      }
    } else {
      res.status(404).json({ ErrorMessage: 'You are not an user!' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createList = (req, res) => {
  try {
    const uid = req.params.uid;
    if (req.userId === uid) {
      if (req.body.title.length > 0) {
        const newList = new userList({
          title: req.body.title,
          user: uid,
          listRole: req.role,
        });
        newList
          .save()
          .then(res.status(200).json({ message: 'new list has been created' }));
      } else {
        res.status(406).json({ ErrorMessage: 'Please put in a title' });
      }
    } else {
      res.status(400).json({ ErrorMessage: 'wrong userId' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateList = async (req, res) => {
  try {
    const validUser = await User.findOne({ _id: req.userId });
    const id = req.params.lid;
    if (validUser) {
      const list = await userList.findOne({ _id: id });
      if (list.user == validUser.id) {
        const options = { new: true };
        const editList = await userList.findByIdAndUpdate(
          id,
          req.body,
          options
        );
        res.status(200).json({
          message: 'List with ID ' + id + ' has now been updated!',
        });
      } else {
        res.status(403).json({
          ErrorMessage: 'You are not the owner!',
        });
      }
    } else {
      res.status(400).json({ ErrorMessage: 'You are not an user!' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteList = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.find({ _id: req.userId });
    if (user) {
      const list = await userList.findById(id);
      if (list.user == req.userId) {
        list.remove();
        res.status(200).json({
          message: list.title + ' has now been deletet!',
        });
      } else {
        res.status(403).json({
          ErrorMessage: 'You are not the owner of this list!',
        });
      }
    }
  } catch (error) {
    res.status(404).json({ message: 'Invalid Id!' });
  }
};

module.exports = { createList, getUserList, updateList, deleteList };
