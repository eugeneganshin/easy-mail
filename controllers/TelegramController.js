const bot = require("../core/telegram")

class TelegramController {
    constructor(bot) {
        this.bot = bot
    }

    test = async (req, res, next) => {
        console.log(req.user)
        bot.start((ctx) => ctx.reply('Welcome'))
        bot.hears('hi', (ctx) => ctx.reply('Hey LOL'))

        next()
    }
}

module.exports = TelegramController