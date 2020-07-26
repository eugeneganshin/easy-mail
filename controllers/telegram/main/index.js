const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const mongoose = require('mongoose')

const { backKeyboard, mainKeyboard } = require('../../../util/keyboard')

const User = mongoose.model('Users')

const { leave } = Stage
const main = new Scene('mainScene')

main.enter(async (ctx) => {
    console.log('MAIN SCENE: ENTER')
    const userid = String(ctx.from.id)
    const user = await User.findOne({ telegramChatId: userid })

    if (!ctx.session.user && !user) {
        return await ctx.scene.enter('unauthorizedScene')
    }

    await ctx.reply('<b>Coke</b> or <i>Pepsi?</i>')
})

main.leave(ctx => ctx.reply('leaving main scene'))

main.command('saveme', leave())
main.hears(/bye/gi, leave())

// actions

module.exports = main
