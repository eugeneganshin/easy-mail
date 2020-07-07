require('dotenv').config()
const express = require('express');
const app = express();
const server = require('http').createServer(app);


require('./core/db')

require('./models/userModel')
require('./models/surveyModel')
require('./services/passport')

const createRoutes = require('./core/routes')
const createSocket = require('./core/socket')
const bot = require('./core/telegram')

const io = createSocket(server)

createRoutes(app, io, bot)

// const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
// bot.start((ctx) => ctx.reply('Welcome'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// bot.launch()



const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`))