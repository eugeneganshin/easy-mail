const mongoose = require('mongoose');
const Surveys = mongoose.model('surveys');
const User = mongoose.model('Users');

const { surveyTemplate } = require('./helpers');
const asyncWrapper = require('../../../util/errorHandler');
const { mainKeyboard } = require('../../../util/keyboard');
const locales = require('../../../locales/en');
const { shared } = locales();

exports.checkUser = async (ctx, next) => {
	try {
		if (ctx.session.user) next(ctx);

		const uid = ctx.from.id;
		const user = await User.findOne({ telegramChatId: uid });
		ctx.session['user'] = user;

		return next(ctx);
	} catch (error) {
		console.error(error);
		ctx.reply(shared.something_went_wrong, mainKeyboard);
		ctx.scene.leave();
	}
};

exports.getAll = asyncWrapper(async (ctx) => {
	const { user } = ctx.session;

	const surveys = await Surveys.find({ _user: user._id });
	await surveys.map(async (survey) => {
		await ctx.replyWithMarkdownV2(surveyTemplate(survey));
	});

	ctx.answerCbQuery();
});

exports.getLastOne = asyncWrapper(async (ctx) => {
	const { user } = ctx.session;

	const surveys = await Surveys.find({ _user: user._id }).sort({ dateSent: -1 }).limit(1);
	await surveys.map(async (survey) => {
		await ctx.replyWithMarkdownV2(surveyTemplate(survey));
	});

	ctx.answerCbQuery();
});

exports.getLastTen = asyncWrapper(async (ctx) => {
	const { user } = ctx.session;

	const surveys = await Surveys.find({ _user: user._id }).sort({ dateSent: -1 }).limit(10);
	await surveys.map(async (survey) => {
		await ctx.replyWithMarkdownV2(surveyTemplate(survey));
	});

	ctx.answerCbQuery();
});
