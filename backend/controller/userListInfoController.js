const userListInfo = require('../model/userListInfo');
const userList = require('../model/userList');

const saveExIntoList = async (req, res) => {
  try {
    const id = req.params.id;
    const exist = await userListInfo.findOne({
      uList: id,
      exId: req.body.exId,
    });
    if (exist === null) {
      const newList = new userListInfo({
        name: req.body.name,
        exId: req.body.exId,
        uList: id,
      });
      newList
        .save()
        .then(
          res.status(200).json({ message: 'Exercise has been added to list' })
        );
    } else {
      res.status(400).json({
        errorMessage: 'Exercise is already in list',
      });
    }
  } catch (error) {
    res.status(404).json({ message: 'Invalid Information, try again' });
  }
};

const fetchExInList = async (req, res) => {
  try {
    const id = req.params.id;
    const lInfo = await userListInfo.find({ uList: id });
    res.status(200).json({ lInfo });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteInfo = async (req, res) => {
  try {
    const id = req.params.id;
    await userListInfo.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Exercise has now been deletet from list!',
    });
  } catch (error) {
    res.status(500).json({ message: 'Invalid Id!' });
  }
};

module.exports = { saveExIntoList, fetchExInList, deleteInfo };
