const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')




const { leave } = Stage
const about = new Scene('about')

about.enter(async (ctx) => {
    await ctx.reply('localesEN.scenes.about')
})

about.leave(async (ctx) => {
    await ctx.reply('localesEN.shared.what_next')
})

module.exports = about