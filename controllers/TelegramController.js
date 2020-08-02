class TelegramController {
	constructor(bot) {
		this.bot = bot;
	}

	handleWebhook = (req, res) => {
		res.status(200);
		this.bot.handleUpdate(req.body, res);
	};
}

module.exports = TelegramController;
