const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')

const { leave } = Stage
const unauth = new Scene('unauthorized')

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

unauth.leave(async ctx => {
    ctx.reply('Bye!')
})

unauth.hears(/ok/gi, leave())

unauth.on('message', ctx => {
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


module.exports = unauth