const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const User = mongoose.model('user');

const Mailer = require('../../../services/Mailer');
const validateEmails = require('../../../util/validateEmails');
const asyncWrapper = require('../../../util/errorHandler');
const surveyTemplate = require('../../../services/emailTemplates/suveyTemplate');
const locales = require('../../../locales/en');
const { backKeyboard, mainKeyboard } = require('../../../util/keyboard');

const { scenes, shared } = locales();

exports.sendSurveyAction = asyncWrapper(async (ctx) => {
	await ctx.answerCbQuery();
	let user = await User.findOne({ telegramChatId: ctx.update.callback_query.from.id });

	const { title, subject, body, recipients } = ctx.wizard.state;

	const survey = new Survey({
		title,
		subject,
		body,
		_user: user._id,
		recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
		dateSent: Date.now(),
	});

	const mailer = new Mailer(survey, surveyTemplate(survey));

	try {
		await mailer.send();
		await survey.save();

		user.credits -= 1;
		await user.save();

		await ctx.reply(scenes.new_survey.success_message, mainKeyboard);
		return await ctx.scene.leave();
	} catch (error) {
		console.error(error);

		await ctx.reply(shared.something_went_wrong, mainKeyboard);
		return await ctx.scene.leave();
	}
});

exports.startAgainAction = asyncWrapper(async (ctx) => {
	await ctx.answerCbQuery();
	await ctx.reply('NO LOGIC');

	return await ctx.scene.reenter();
});

exports.enterAction = asyncWrapper(async (ctx) => {
	await ctx.reply(scenes.new_survey.additional_message, backKeyboard);
	await ctx.reply(scenes.new_survey.message, scenes.new_survey.buton);

	return ctx.wizard.next();
});

exports.getTitleAction = asyncWrapper(async (ctx) => {
	await ctx.answerCbQuery();
	await ctx.reply(scenes.new_survey.title);
	return await ctx.wizard.next();
});

exports.getTitleCommand = asyncWrapper(async (ctx) => {
	await ctx.reply(scenes.new_survey.title);
	return ctx.wizard.next();
});

exports.getSubjectAction = asyncWrapper(async (ctx) => {
	if (ctx.message) ctx.wizard.state['title'] = ctx.message.text;
	await ctx.reply(scenes.new_survey.subject);

	return ctx.wizard.next();
});

exports.getBodyAction = asyncWrapper(async (ctx) => {
	if (ctx.message) ctx.wizard.state['subject'] = ctx.message.text;
	await ctx.reply(scenes.new_survey.body);

	return ctx.wizard.next();
});

exports.getRecipientsAction = asyncWrapper(async (ctx) => {
	if (ctx.message) ctx.wizard.state['body'] = ctx.message.text;
	await ctx.reply(scenes.new_survey.recipients);

	return ctx.wizard.next();
});

exports.showResultAction = asyncWrapper(async (ctx) => {
	let recipients;
	if (ctx.message) {
		recipients = ctx.message.text;
		ctx.wizard.state['recipients'] = recipients;
	}

	const { title, subject, body } = ctx.wizard.state;

	// If invalid emails, start current step again.
	const invalidEmails = await validateEmails(recipients);
	if (invalidEmails) {
		await ctx.reply(invalidEmails);
		await ctx.wizard.back();
		return ctx.wizard.steps[ctx.wizard.cursor](ctx);
	}

	const resultMessage = `TITLE:\n${title}\nSUBJECT:\n${subject}\nBODY:\n${body}\nRECIPIENTS:\n${recipients}`;
	await ctx.reply(scenes.new_survey.choice, scenes.new_survey.resultButtons);
	await ctx.reply(resultMessage);

	return ctx.wizard.next();
});

exports.infoOnInputAction = asyncWrapper(async (ctx) => {
	await ctx.replyWithMarkdownV2(scenes.new_survey.info_on_input_message);
});
