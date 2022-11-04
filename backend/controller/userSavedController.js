const userSaved = require('../model/userSaved');
const User = require('../model/user');

// Save an exercise
const saveEx = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (user) {
      const id = req.params.id;
      if (req.userId == id) {
        const exist = await userSaved.findOne({
          user: id,
          exId: req.body.exId,
        });
        if (exist === null) {
          const newSave = new userSaved({
            name: req.body.name,
            exId: req.body.exId,
            user: id,
          });
          newSave.save().then(
            res.status(200).json({
              message: 'The Exercise has been saved',
            })
          );
        } else {
          res.status(400).json({
            errorMessage: 'Exercise is already saved',
          });
        }
      } else {
        res.status(400).json({ errorMessage: 'You are not the user!' });
      }
    } else {
      res.status(403).json({
        errorMessage: 'You are not an valid user!',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Read users saved exercises
const fetchSaved = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (user) {
      const id = req.params.id;
      if (req.userId == id) {
        const sInfo = await userSaved.find({ user: id });
        res.status(200).json({ sInfo });
      } else {
        res.status(400).json({ errorMessage: 'You are not the user' });
      }
    } else {
      res.status(403).json({
        errorMessage: 'You are not an valid user!',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Delete a saved exercise
const deleteSavedEx = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (user) {
      const id = req.params.id;
      const list = await userSaved.findOne({ _id: id });
      if (req.userId == list.user) {
        await userSaved.findByIdAndDelete(id);
        res.status(200).json({
          message: 'Saved exercise has now been deleteted!',
        });
      } else {
        res.status(400).json({ errorMessage: 'You are not the user' });
      }
    } else {
      res.status(403).json({
        errorMessage: 'You are not an valid user!',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid Id!' });
  }
};

// Delete saved ex from searched exercise page
const deleteSaved = async (req, res) => {
  try {
    const uid = req.params.uid;
    const eid = req.params.eid;
    const user = await userSaved.findOne({ user: uid, exId: eid });
    await userSaved.deleteOne(user);
    res.status(200).json({
      message: 'Saved exercise has now been deleteted!',
    });
  } catch (error) {
    res.status(500).json({ message: 'Invalid Id!' });
  }
};

module.exports = { saveEx, fetchSaved, deleteSavedEx, deleteSaved };
