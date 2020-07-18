const mongoose = require("mongoose");
const { startsWith } = require("lodash");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
  telegramSecret: String,
  telegramChatId: Number
});

mongoose.model("Users", userSchema);
