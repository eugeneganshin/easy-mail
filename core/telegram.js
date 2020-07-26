const { Telegraf } = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')

const keys = require('../config/keys')

const isLoggedin = require('../middleware')
const aboutScene = require('../controllers/telegram/about')
const helpScene = require('../controllers/telegram/help')
const surveysScene = require('../controllers/telegram/surveys')
const newSurveyScene = require('../controllers/telegram/newSurvey')

const asyncWrapper = require('../util/errorHandler')
const { backKeyboard, mainKeyboard, testKeyboard } = require('../util/keyboard')

const { leave } = Stage

const stage = new Stage()
stage.command('cancel', leave())


stage.register(aboutScene)
stage.register(helpScene)
stage.register(surveysScene)
stage.register(newSurveyScene)

const bot = new Telegraf(keys.TELEGRAM_TOKEN)

bot.use(session())
bot.use(stage.middleware())

bot.command('saveme', async ctx => await ctx.reply('What next?', testKeyboard))
bot.start(isLoggedin)

bot.hears('❓ ABOUT', async ctx => await ctx.scene.enter('aboutScene'))
bot.hears('👀 HELP', async ctx => await ctx.scene.enter('helpScene'))
bot.hears('📎 SHOW MY SURVEYS', async ctx => await ctx.scene.enter('surveyScene'))
bot.hears('📝 CREATE NEW SURVEY', async ctx => await ctx.scene.enter('newSurveyScene'))

bot.hears('back', async (ctx) => ctx.reply('✋ Hey, what are you up to?', testKeyboard))
bot.hears(/(.*?)/, async (ctx) => {
    await ctx.reply('🚧 Choose section', testKeyboard)
});

module.exports = bot


// bot.hears('show my surveys', async ctx => await ctx.scene.enter('surveysScene'))
// bot.hears('create new survey', async ctx => await ctx.scene.enter('newSurveyScene'))