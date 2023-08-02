const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const SECRET_KEY = "apikeytoken"
///schema represent documenet mtlb ju hum database data save krthy hae wu humy kis tara chaiyae hothy us liyae used krthy hae
const adminSchema = new mongoose.Schema({
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

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.repeatpassword = await bcrypt.hash(this.repeatpassword, 12);
  }
  next();
});

// }
// we are generating a token
// adminSchema.methods.generateAuthToken = function () {
//   try {
//     return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
//       // expiresIn: process.env.JWT_EXPIRE,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

/////////reset token password
// adminSchema.methods.getResetPasswordToken = async function () {
//   const resettoken = crypto.randomBytes(20).toString("hex");

//   ///////////hashing and resetpasswordtoken to userShema

//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resettoken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//   return resettoken;
// };

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
