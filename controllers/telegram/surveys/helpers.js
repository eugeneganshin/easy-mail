const { Extra } = require('telegraf');
const locales = require('../../../locales/en');
const surveys = require('.');

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

exports.surveyTemplate = (survey) => {
	const title = `*TITLE:* _${survey.title}_\n\n`;
	const subject = `*SUBJECT:* ${survey.subject} \n\n`;
	const body = `*BODY:* ${survey.body} \n\n`;
	const yes = `*YES:* ${survey.yes} \\| `;
	const no = `*NO:* ${survey.no}`;

	return title + subject + body + yes + no;
};
