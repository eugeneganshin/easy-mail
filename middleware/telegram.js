const mongoose = require('mongoose');
const base64url = require('base64url');
const User = mongoose.model('user');

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

exports.checkUser = async (ctx, next) => {
	if (ctx.session.user) {
		return next(ctx);
	}

	try {
		const uid = ctx.from.id;
		const user = await User.findOne({ telegramChatId: uid });
		ctx.session['user'] = user;

		return next(ctx);
	} catch (error) {
		console.error(error);
		await ctx.reply(shared.something_went_wrong, mainKeyboard);
		return await ctx.scene.leave();
	}
};

exports.isEnoughCredits = async (ctx, next) => {
	if (ctx.session.user.credits < 1) {
		await ctx.reply(scenes.new_survey.not_enough_credits, mainKeyboard);
		return await ctx.scene.leave();
	}

	next(ctx);
};
