const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    trim: true,
    minlength: 3,
  },

  lastName: {
    type: String,
    required: [true, "please provide last name"],
    trim: true,
    minlength: 3,
  },

  email: {
    type: String,
    unique: true,
    required: [true, "please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },

  phoneNumber: {
    type: String,
    required: [true, "Please provide phone number"],
    length: 10,
  },

  image: {
    type: String,
  },
});

AdminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

module.exports = mongoose.model("Admin", AdminSchema);
