const { Extra } = require('telegraf');
const locales = require('../../../locales/en');

const {
	scenes: {
		surveys: { buttons },
	},
} = locales();

exports.surveyButtons = Extra.HTML().markup((m) =>
	m.inlineKeyboard([
		[m.callbackButton(buttons.all.text, buttons.all.cb)],
		[
			m.callbackButton(buttons.last.text, buttons.last.cb),
			m.callbackButton(buttons.last10.text, buttons.last10.cb),
		],
	])
);
