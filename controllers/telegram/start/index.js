const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const mongoose = require('mongoose')
const base64url = require('base64url')
const getKeyboards = require('../../../util/keyboard')

const Users = mongoose.model('Users')

const { leave } = Stage
const start = new Scene('startScene')

const replies = {
    authorized: `Hey! First of all, thanks for activating me!\n\nThe bot can do anything the website can do, so check it out!`,
    unauthorized: `Hey! I don't know you. Visit our website first!\n`,
    website: {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'easymail', url: 'https://easymail.com' }
                ]
            ]
        }
    }
}

start.enter(async (ctx) => {
    const userid = String(ctx.from.id)
    const decoded = await base64url.decode(ctx.startPayload)
    const user = await Users.findOneAndUpdate({ telegramSecret: decoded }, { telegramChatId: userid })

    if (user) {
        ctx.session.user = user
        console.log('Start scene user')
        await ctx.reply(replies.authorized)
        await ctx.scene.enter('mainScene')
    } else {
        console.log('Start scene else')
        // TODO: test it
        await ctx.reply(replies.unauthorized, replies.website)
        leave()
    }
})

start.leave((ctx) => ctx.reply('Bye'))
start.hears(/bye/gi, leave())


// start.action(/test/gi, ctx => {
//     ctx.answerCbQuery()
//     ctx.reply('test')
// })

// start.action(/test1/gi, ctx => {
//     ctx.answerCbQuery()
//     ctx.reply('test1')
// })

module.exports = start
