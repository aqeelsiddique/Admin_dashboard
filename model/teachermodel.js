const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// const jwt = require('jsonwebtoken')
///schema represent documenet mtlb ju hum database data save krthy hae wu humy kis tara chaiyae hothy us liyae used krthy hae
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  repeatpassword: {
    type: String,
    require: true,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  token: {
    type: String,
    default: "",
  },
});
//we are hashing a password

teacherSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.repeatpassword = await bcrypt.hash(this.repeatpassword, 12);
  }
  next();
});

const Teacher = mongoose.model("teacher", teacherSchema);
module.exports = Teacher;
