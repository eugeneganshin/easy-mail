const Markup = require('telegraf/markup')
const { Extra } = require('telegraf')

exports.backKeyboard = Markup.keyboard(['◀️ BACK']).resize().extra()

exports.mainKeyboard = Extra.HTML().markup((m) =>
    m.inlineKeyboard(
        [
            [
                m.callbackButton('INFO', 'INFO'),
                m.callbackButton('HELP', 'HELP')
            ],
            [
                m.callbackButton('SHOW MY SURVEYS', 'SURVEYS'),
                m.callbackButton('CREATE NEW SURVEY', 'NEW_SURVEY')
            ],
            [
                { text: 'VISIT WEBSITE', callback_data: 'URL', url: 'https://easymail.com' }
            ]
        ]
    ))

exports.testKeyboard = Markup.keyboard([
    ['❓ ABOUT', '👀 HELP'],
    ['📎 SHOW MY SURVEYS', '📝 CREATE NEW SURVEY'],
    ['VISIT WEBSITE']
]).resize().extra()