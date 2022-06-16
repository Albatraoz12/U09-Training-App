const mongoose = require("mongoose");

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
    roll: {
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

module.exports = mongoose.model("User", UserSchema);
