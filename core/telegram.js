const { Telegraf } = require('telegraf')
const keys = require('../config/keys')

const bot = new Telegraf(keys.TELEGRAM_TOKEN)
bot.launch()

module.exports = bot
