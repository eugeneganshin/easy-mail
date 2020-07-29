const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const { backKeyboard, mainKeyboard } = require('../../../util/keyboard')
const locales = require('../../../locales/en')

const { scenes, shared, keyboards, other } = locales()

const replies = {
    enter: 'ENTERING SURVEYS SCENE',
    leave: `✋ Hey, what are you up to?`
}

const { leave } = Stage
const surveys = new Scene('surveyScene')

surveys.enter(async (ctx) => {
    await ctx.reply(scenes.surveys.test, backKeyboard)
})

surveys.leave(async (ctx) => {
    await ctx.reply(shared.what_next, mainKeyboard)
})

// command,hears,action
surveys.action('saveme', leave())
surveys.hears(keyboards.back_keyboard.back, leave())

module.exports = surveys