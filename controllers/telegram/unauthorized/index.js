const Scene = require('telegraf/scenes/base')

const unauth = new Scene('unauthorizedScene')

unauth.enter(async ctx => {
    ctx.reply('Please visit this website first\n', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'easymail', url: 'https://easymail.com' }
                ]
            ]
        }
    })
})

unauth.leave()

module.exports = unauth