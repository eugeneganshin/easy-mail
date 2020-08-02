const Markup = require('telegraf/markup');
const { Extra } = require('telegraf');

const locales = require('../locales/en');

const { keyboards } = locales();

exports.backKeyboard = Markup.keyboard([keyboards.back_keyboard.back]).resize().extra();

exports.mainKeyboard = Markup.keyboard([
	[keyboards.main_keyboard.surveys, keyboards.main_keyboard.new_survey],
	[keyboards.main_keyboard.about, keyboards.main_keyboard.contact],
	[keyboards.main_keyboard.website],
])
	.resize()
	.extra();

// INLINE KEYBOARD
// exports.mainKeyboard = Extra.HTML().markup((m) =>
//     m.inlineKeyboard(
//         [
//             [
//                 m.callbackButton('INFO', 'INFO'),
//                 m.callbackButton('HELP', 'HELP')
//             ],
//             [
//                 m.callbackButton('SHOW MY SURVEYS', 'SURVEYS'),
//                 m.callbackButton('CREATE NEW SURVEY', 'NEW_SURVEY')
//             ],
//             [
//                 { text: 'VISIT WEBSITE', callback_data: 'URL', url: 'https://easymail.com' }
//             ]
//         ]
//     ))
