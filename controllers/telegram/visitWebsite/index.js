const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { backKeyboard, mainKeyboard } = require('../../../util/keyboard');
const locales = require('../../../locales/en');

const { scenes, shared, keyboards, other } = locales();

const { leave } = Stage;
const visitScene = new Scene('visitWebsiteScene');

visitScene.enter(async (ctx) => {
	await ctx.reply(scenes.visit_website.message, scenes.visit_website.button);
	await ctx.replyWithSticker(scenes.visit_website.sticker, backKeyboard);
});

visitScene.leave(async (ctx) => {
	await ctx.reply(shared.what_next, mainKeyboard);
});

// command,hears,action
visitScene.command('back', leave());
visitScene.hears(keyboards.back_keyboard.back, leave());
visitScene.action('saveme', leave());

module.exports = visitScene;
