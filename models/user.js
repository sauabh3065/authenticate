const { string, number } = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  accesstoken: {
    type: String,
    default: null,
  },
  password : {
    type: String,
  }
});
exports.UserModel = mongoose.model("user", userSchema);
