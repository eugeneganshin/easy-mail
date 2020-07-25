const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const mongoose = require('mongoose')
const base64url = require('base64url')
const getKeyboards = require('../../../util/keyboard')

const Users = mongoose.model('Users')

const { leave } = Stage
const start = new Scene('start')

start.enter(async (ctx) => {
    const uid = String(ctx.from.id)
    const decoded = await base64url.decode(ctx.startPayload)
    const user = await Users.findOne({ telegramSecret: decoded })

    const { mainKeyboard } = getKeyboards.getMainKeyboard()
    console.log(mainKeyboard)

    if (user) {
        await ctx.reply(`Hey! First of all, thanks for activating me!\n\nThe bot can do anything the website can do, so check it out!`)
    } else {
        await ctx.reply(`Hey! I don't know you. Visit our website first!\n\nhttps://easymail.com`, Extra.HTML().markup((m) =>
            m.inlineKeyboard([
                m.callbackButton('Coke', 'Coke'),
                m.callbackButton('Pepsi', 'Pepsi')
            ])))
    }
})

start.leave((ctx) => ctx.reply('Bye'))
start.hears(/hi/gi, leave())


start.action(/coke/gi, ctx => {
    ctx.answerCbQuery()
    ctx.reply('Coke')
})

start.action(/pepsi/gi, ctx => {
    ctx.answerCbQuery()
    ctx.reply('Pepsi')
})

module.exports = start