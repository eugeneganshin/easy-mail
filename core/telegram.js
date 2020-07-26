const { Telegraf } = require('telegraf')
const { MenuTemplate, MenuMiddleware, createBackMainMenuButtons } = require('telegraf-inline-menu')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const keys = require('../config/keys')

const aboutScene = require('../controllers/telegram/about')
const startScene = require('../controllers/telegram/start')
const mainScene = require('../controllers/telegram/main')
const unauthorizedScene = require('../controllers/telegram/unauthorized')

const asyncWrapper = require('../util/errorHandler')

const { leave } = Stage

const stage = new Stage()
stage.command('cancel', leave())

stage.register(unauthorizedScene)
stage.register(startScene)
stage.register(mainScene)

const bot = new Telegraf(keys.TELEGRAM_TOKEN)

bot.use(session())
bot.use(stage.middleware())

bot.start(asyncWrapper(async (ctx) => ctx.scene.enter('startScene')))
bot.on('message', ctx => ctx.scene.enter('mainScene'))
// bot.on('message', ctx => ctx.reply('ok'))

module.exports = bot
