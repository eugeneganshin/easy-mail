const { Telegram } = require('telegraf');

const keys = require('../../../config/keys');

const telegram = new Telegram(keys.TELEGRAM_TOKEN, {});

exports.sendMessage = async (ctx) => {
	const msg = `From: ${JSON.stringify(ctx.from)}.\n\nMessage: ${ctx.message.text}`;

	await telegram.sendMessage(keys.TELEGRAM_ADMIN_ID, msg);
};
