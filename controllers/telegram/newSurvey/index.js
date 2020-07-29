const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const locales = require('../../../locales/en')
const { backKeyboard, mainKeyboard } = require('../../../util/keyboard')
const question = require('./middleware')

const { scenes, shared, keyboards, other } = locales()

const { leave } = Stage
const newSurvey = new Scene('newSurveyScene')

newSurvey.enter(question, async (ctx) => {
    await ctx.reply(scenes.new_survey.test, backKeyboard)
    await ctx.question('HEY')
})



newSurvey.leave(async (ctx) => {
    await ctx.reply(shared.what_next, mainKeyboard)
})

// command,hears,action
newSurvey.hears(keyboards.back_keyboard.back, leave())
newSurvey.action('saveme', leave())

module.exports = newSurvey