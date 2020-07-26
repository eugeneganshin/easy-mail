const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const { backKeyboard, testKeyboard } = require('../../../util/keyboard')

const replies = {
    enter: 'ENTERING HELP NEW SURVEY SCENE',
    leave: `✋ Hey, what are you up to?`
}

const { leave } = Stage
const newSurvey = new Scene('newSurveyScene')

newSurvey.enter(async (ctx) => {
    await ctx.reply(replies.enter, backKeyboard)
})

newSurvey.leave(async (ctx) => {
    await ctx.reply(replies.leave, testKeyboard)
})

// command,hears,action
newSurvey.action('saveme', leave())
newSurvey.hears(/back/gi, leave())

module.exports = newSurvey