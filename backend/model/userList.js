const mongoose = require("mongoose");

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
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserList", userListSchema);
