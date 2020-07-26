const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const { backKeyboard, testKeyboard } = require('../../../util/keyboard')

const replies = {
    enter: 'ENTERING HELP SCENE',
    leave: `✋ Hey, what are you up to?`
}

const { leave } = Stage
const help = new Scene('helpScene')

help.enter(async (ctx) => {
    await ctx.reply(replies.enter, backKeyboard)
})

help.leave(async (ctx) => {
    await ctx.reply(replies.leave, testKeyboard)
})

// command,hears,action
help.action('saveme', leave())
help.hears(/back/gi, leave())

module.exports = help