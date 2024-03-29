const mongoose = require('mongoose');

const userListInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
    },
    exId: {
      type: String,
      required: true,
      max: 50,
    },
    uList: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserList',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserListInfo', userListInfoSchema);
