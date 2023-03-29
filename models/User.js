const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      trim: true,
      required: false,
    },
    phoneNumber:{
      type: String
    },
        walletAddress:{
          type: String
        },
    role: {
      type: String,
      trim: true,
      required: false,
    },

  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
