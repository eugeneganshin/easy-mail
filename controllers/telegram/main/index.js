const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const mongoose = require('mongoose')

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
    // [INFO], [HELP], [SHOW MY SURVEYS], [CREATE NEW SURVEY], [VISIT WEBPAGE]
    await ctx.reply('Main Scene' + ctx.from.id)
})

main.leave(async (ctx) => {
    console.log('MAIN SCENE: LEAVE')
    return
})
main.hears(/bye/gi, leave())
main.on('message', ctx => ctx.reply('say bye'))

module.exports = main
