const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { getAll, getLastOne, getLastTen, checkUser } = require('./actions');

const { backKeyboard, mainKeyboard } = require('../../../util/keyboard');
const { surveyButtons } = require('./helpers');
const locales = require('../../../locales/en');

const { scenes, shared, keyboards, other } = locales();

const { leave } = Stage;
const surveys = new Scene('surveyScene');

surveys.enter(checkUser, async (ctx) => {
	await ctx.reply(scenes.surveys.message, surveyButtons);
	await ctx.replyWithSticker(scenes.surveys.sticker, backKeyboard);
});

surveys.leave(async (ctx) => {
	await ctx.reply(shared.what_next, mainKeyboard);
});

surveys.command('saveme', leave());
surveys.action(scenes.surveys.buttons.all.cb, getAll);
surveys.action(scenes.surveys.buttons.last.cb, getLastOne);
surveys.action(scenes.surveys.buttons.last10.cb, getLastTen);

surveys.hears(keyboards.back_keyboard.back, leave());

module.exports = surveys;
