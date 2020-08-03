const mongoose = require('mongoose');
const base64url = require('base64url');
const User = mongoose.model('Users');

const locales = require('../locales/en');
const { scenes, shared } = locales();

exports.verifyNewUser = async (ctx, next) => {
	const uid = ctx.from.id;
	const payload = ctx.startPayload;
	const decoded = await base64url.decode(payload);

	const user = await User.findOne({ telegramChatId: uid });
	const newUser = await User.findOneAndUpdate({ telegramSecret: decoded }, { telegramChatId: uid });

	if (newUser) {
		ctx.session['user'] = newUser;
		await ctx.reply(shared.bot_description);
		await ctx.reply(scenes.start.new_account);
		return next(ctx);
	} else if (user) {
		return next(ctx);
	} else {
		await ctx.reply(shared.bot_description);
		await ctx.reply(scenes.start.unknown_user_message, scenes.start.button);
	}
};
