const mongoose = require('mongoose');
const base64url = require('base64url');
const { MenuTemplate, MenuMiddleware, createBackMainMenuButtons } = require('telegraf-inline-menu');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { leave } = Stage;

const Survey = mongoose.model('surveys');
const Users = mongoose.model('Users');
const keys = require('../config/keys');

// NOTES:
// Remove deeplink from frontend as soon as we have user_chat_id in model
// Remove secret from DB aswell

class TelegramController {
	constructor(bot, io) {
		this.bot = bot;
		this.io = io;
	}

	testing = (req, res) => {
		res.status(200);
		this.bot.handleUpdate(req.body, res);
	};
	// bot.start((ctx) => ctx.reply(`Deep link payload: ${ctx.startPayload}`))
	deeplink = (req, res, next) => {
		this.bot.start((ctx) => ctx.reply(`Deep link payload: ${ctx.startPayload}`));
		this.bot.handleUpdate(req.body, res);
		next();
	};
	// query for start
	handleReq = async (req, res, next) => {
		if (req.body.callback_query) return next();

		if (req.body.message.text.startsWith('/start')) {
			const link = req.body.message.text;
			const chatId = req.body.message.from.id;

			const code = this.#extractUniqueCode(link);
			const decoded = await this.#base64urlDecode(code);
			const user = await this.#getUser(decoded);

			// console.log(user, 'handleReq')
			// ? safe user to req.user or not ?
			if (user !== null) {
				const updatedUser = await Users.findByIdAndUpdate(
					{ _id: user._id },
					{ telegramChatId: chatId }
				);
				return next();
			}

			return next();
		}

		return next();
	};

	isLoggedIn = async (req, res, next) => {
		let chatId;
		if (req.body.callback_query) {
			chatId = req.body.callback_query.from.id;
		} else {
			chatId = req.body.message.from.id;
		}

		const user = await Users.findOne({ telegramChatId: chatId });

		if (user) {
			console.log('WITH USER');
			req['user'] = user;
			return next();
		}

		console.log('WITHOUT USER');
		this.bot.start((ctx) => ctx.reply(`Welcome traveller. I don't know you!`));
		return this.bot.handleUpdate(req.body, res);
	};

	sceneTest = async (req, res, next) => {
		// Greeter scene
		const greeter = new Scene('greeter');
		greeter.enter((ctx) => ctx.reply('Hi'));
		greeter.leave((ctx) => ctx.reply('Bye'));
		greeter.hears(/hi/gi, leave());
		greeter.on('message', (ctx) => ctx.reply('Send `hi`'));

		// Create scene manager
		const stage = new Stage();
		stage.command('cancel', leave());

		// Scene registration
		stage.register(greeter);

		this.bot.use(stage.middleware());
		next();
	};

	// IF this function is not first get bug
	start = async (req, res, next) => {
		/**
		 * MENU STRUCTURE
		 *
		 * [INFO], [HELP], [SHOW MY SURVEYS], [CREATE NEW SURVEY], [VISIT WEBPAGE]
		 */
		const { user } = req;

		const menuTemplate = new MenuTemplate((ctx) => `MENU\n`);

		// THESE SHOULD BE SCENCES

		this.#infoMenu(menuTemplate);
		this.#helpMenu(menuTemplate);
		this.#surveysMenu(menuTemplate, user);

		const menuMiddleware = new MenuMiddleware('/', menuTemplate);
		// this.bot.start((ctx) => ctx.reply(`Welcome traveller. I know you!`))
		this.bot.command('menu', (ctx) => menuMiddleware.replyToContext(ctx));

		this.bot.use(menuMiddleware);
		// console.log(req.body.callback_query)
		return this.bot.handleUpdate(req.body, res);
	};

	#extractUniqueCode = (link) => {
		if (link.split(' ').length > 1) {
			return link.split(' ')[1];
		}

		return null;
	};

	#getUser = async (secret) => {
		const user = await Users.findOne({ telegramSecret: secret });

		if (user !== null) {
			return user;
		} else {
			return null;
		}
	};

	#infoMenu = (menu) => {
		return menu.interact('INFO', 'info', {
			do: async (ctx) => {
				await ctx.reply('Info');
				return true;
			},
		});
	};

	#helpMenu = (menu) => {
		return menu.interact('HELP', 'help', {
			joinLastRow: true,
			do: async (ctx) => {
				await ctx.reply('help info');
				return true;

				// You can return true to update the same menu or use a relative path
				// For example '.' for the same menu or '..' for the parent menu
				// return '.'
			},
		});
	};

	// FIND OUT HOW TO PASS ALL THE SURVEYS IN REPLY
	#surveysMenu = async (menu, user) => {
		const surveys = await Survey.find({ _user: user.id }).populate('_user').select('-recipients');
		console.log(surveys);

		return menu.interact('MY SURVEYS', 'mysurveys', {
			joinLastRow: true,
			do: async (ctx) => {
				ctx.reply('ye');
				return true;

				// You can return true to update the same menu or use a relative path
				// For example '.' for the same menu or '..' for the parent menu
				// return '.'
			},
		});
	};

	#fetchSurveys = async (user) => {
		const surveys = await Survey.find({ _user: user._id }).populate('_user').select('-recipients');

		return surveys;
	};

	#base64urlEncode = async (string, id) => {
		return await base64url(`${string}=${id}`);
	};

	#base64urlDecode = async (string) => {
		if (string === null) return null;
		return await base64url.decode(string);
	};
}

module.exports = TelegramController;
