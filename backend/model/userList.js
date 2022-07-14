const mongoose = require('mongoose');
const userListInfo = require('./userListInfo');

const userListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 50,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    listRole: {
      type: String,
      max: 20,
    },
  },
  { timestamps: true }
);

userListSchema.pre('remove', function (next) {
  userListInfo.deleteMany({ uList: this.id }, (err) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
});

module.exports = mongoose.model('UserList', userListSchema);
