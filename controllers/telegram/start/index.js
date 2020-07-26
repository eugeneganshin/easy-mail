const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const mongoose = require('mongoose')
const base64url = require('base64url')

const { backKeyboard, mainKeyboard } = require('../../../util/keyboard')

const Users = mongoose.model('Users')

const { leave } = Stage
const start = new Scene('startScene')

// TODO: make a file and use it instead
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
    },
    shared: {
        what_next: '✋ Hey, what are you up to?'
    }
}


start.enter(async (ctx) => {
    console.log('START_SCENE: ENTER')

    const userid = ctx.from.id
    const decoded = await base64url.decode(ctx.startPayload)
    const newUser = await Users.findOneAndUpdate({ telegramSecret: decoded }, { telegramChatId: userid })
    const user = await Users.findOne({ telegramChatId: userid })

    if (newUser) {
        // record new user to session
        ctx.session['user'] = newUser

        //answer with new user message
        await ctx.reply(replies.authorized)
        await ctx.scene.enter('mainScene')
    } else if (user) {
        // answer with old user message
    } else {
        // answer with unauthorized message
        // ? start unauth scene
        await ctx.reply(replies.unauthorized, replies.website)
        leave()
    }
})

start.leave(async (ctx) => await ctx.reply('UNAUTHORIZED USER'))
start.command('saveme', leave())

module.exports = start
