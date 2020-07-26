const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const { backKeyboard, testKeyboard } = require('../../../util/keyboard')

const replies = {
    enter: 'ENTERING SURVEYS SCENE',
    leave: `✋ Hey, what are you up to?`
}

const { leave } = Stage
const surveys = new Scene('surveyScene')

surveys.enter(async (ctx) => {
    await ctx.reply(replies.enter, backKeyboard)
})

surveys.leave(async (ctx) => {
    await ctx.reply(replies.leave, testKeyboard)
})

// command,hears,action
surveys.action('saveme', leave())
surveys.hears(/back/gi, leave())

module.exports = surveys