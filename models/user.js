const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },


    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],

    },
 

    password: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);


const User = mongoose.model("User", userSchema);


module.exports = User;
