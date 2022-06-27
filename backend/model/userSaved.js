const mongoose = require('mongoose');

const userSavedListSchema = new mongoose.Schema(
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserListInfo', userSavedListSchema);
