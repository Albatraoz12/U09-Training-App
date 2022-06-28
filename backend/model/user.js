const mongoose = require('mongoose');
const userList = require('./userList');
const userSaves = require('./userSaved');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      max: 50,
    },
    role: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

UserSchema.pre('remove', function (next) {
  userList.deleteMany({ user: this.id }, (err) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
});

UserSchema.pre('remove', function (next) {
  userSaves.deleteMany({ user: this.id }, (err) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
});

module.exports = mongoose.model('User', UserSchema);
