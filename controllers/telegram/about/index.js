const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const locales = require('../../../locales/en');
const { backKeyboard, mainKeyboard } = require('../../../util/keyboard');

const { scenes, shared, keyboards, other } = locales();

const { leave } = Stage;
const about = new Scene('aboutScene');

about.enter(async (ctx) => {
	await ctx.reply(scenes.about.enter, backKeyboard);
});

about.leave(async (ctx) => {
	await ctx.reply(shared.what_next, mainKeyboard);
});

// command,hears,action
about.hears(keyboards.back_keyboard.back, leave());
about.command('saveme', leave());

module.exports = about;
