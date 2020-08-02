const { Telegraf } = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');

const keys = require('../config/keys');
const locales = require('../locales/en');

const telegramMiddleware = require('../middleware');
const aboutScene = require('../controllers/telegram/about');
const contactScene = require('../controllers/telegram/contact');
const surveysScene = require('../controllers/telegram/surveys');
const newSurveyScene = require('../controllers/telegram/newSurvey');
const visitWebsiteScene = require('../controllers/telegram/visitWebsite');

const asyncWrapper = require('../util/errorHandler');
const { mainKeyboard } = require('../util/keyboard');
const { shared, keyboards, other } = locales();

const { leave } = Stage;

const stage = new Stage([
	aboutScene,
	contactScene,
	surveysScene,
	newSurveyScene,
	visitWebsiteScene,
]);
stage.command('cancel', leave());

const bot = new Telegraf(keys.TELEGRAM_TOKEN);

bot.use(session());
bot.use(stage.middleware());

bot.command(
	'saveme',
	asyncWrapper(async (ctx) => await ctx.reply(shared.what_next, mainKeyboard))
);
bot.action(
	'next',
	asyncWrapper(async (ctx) => {
		await ctx.answerCbQuery();
		await ctx.reply(other.default_handler, mainKeyboard);
	})
);

bot.start(telegramMiddleware.isLoggedin);

bot.hears(
	keyboards.main_keyboard.about,
	asyncWrapper(async (ctx) => await ctx.scene.enter('aboutScene'))
);

bot.hears(
	keyboards.main_keyboard.contact,
	asyncWrapper(async (ctx) => await ctx.scene.enter('contactScene'))
);

bot.hears(
	keyboards.main_keyboard.surveys,
	asyncWrapper(async (ctx) => await ctx.scene.enter('surveyScene'))
);

bot.hears(
	keyboards.main_keyboard.new_survey,
	asyncWrapper(async (ctx) => await ctx.scene.enter('newSurvey'))
);

bot.hears(
	keyboards.main_keyboard.website,
	asyncWrapper(async (ctx) => await ctx.scene.enter('visitWebsiteScene'))
);

bot.hears(
	'super',
	asyncWrapper(async (ctx) => await ctx.scene.enter('super-wizard'))
);

bot.hears(
	keyboards.back_keyboard.back,
	asyncWrapper(async (ctx) => ctx.reply(shared.what_next, mainKeyboard))
);

bot.hears(
	/(.*?)/,
	asyncWrapper(async (ctx) => {
		await ctx.reply(other.default_handler, mainKeyboard);
	})
);

bot.on(
	'message',
	asyncWrapper(async (ctx) => {
		await ctx.reply(other.default_handler, mainKeyboard);
	})
);

module.exports = bot;
