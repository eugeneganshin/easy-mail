const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 },
	telegramSecret: String,
	telegramChatId: Number,
});

mongoose.model('user', userSchema);
