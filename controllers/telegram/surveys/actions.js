const mongoose = require('mongoose');
const Surveys = mongoose.model('surveys');
const User = mongoose.model('Users');

const { mainKeyboard } = require('../../../util/keyboard');
const locales = require('../../../locales/en');
const { shared } = locales();

exports.getAll = (ctx) => {};
exports.getLast = (ctx) => {};
exports.getLastTen = (ctx) => {};

exports.checkUser = async (ctx, next) => {
	try {
		if (ctx.session.user) {
			// TODO: test
			const surveys = Surveys.find({ _user: ctx.session.user.id });
			next(ctx);
		}
		const uid = ctx.from.id;
		const user = await User.findOne({ telegramChatId: uid });
		const surveys = await Surveys.find({ _user: user._id });

		return next(ctx);
	} catch (error) {
		console.error(error);
		ctx.reply(shared.something_went_wrong, mainKeyboard);
		ctx.scene.leave();
	}
};
