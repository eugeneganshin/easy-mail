const mongoose = require('mongoose');
const base64url = require('base64url');
const User = mongoose.model('Users');

exports.isLoggedin = async (ctx, next) => {
	const uid = ctx.from.id;
	const payload = ctx.startPayload;
	const decoded = await base64url.decode(payload);

	const user = await User.findOne({ telegramChatId: uid });
	const newUser = await User.findOneAndUpdate({ telegramSecret: decoded }, { telegramChatId: uid });
	console.log('Middleware global');
	if (newUser) {
		ctx.session['user'] = newUser;
		return next(ctx);
	} else if (user) {
		return next(ctx);
	} else {
		// TODO: test button
		ctx.reply(`I don't know you, visit site and comeback!`, {
			reply_markup: {
				inline_keyboard: [[{ text: 'easymail', url: 'https://easymail.com' }]],
			},
		});
	}
};
