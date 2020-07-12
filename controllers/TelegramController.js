const base64url = require('base64url')
const keys = require('../config/keys')

class TelegramController {
    constructor(bot, io) {
        this.bot = bot
        this.io = io
    }

    test = async (req, res, next) => {
        console.log(req.user)
        bot.start((ctx) => ctx.reply('Welcome'))
        bot.hears('hi', (ctx) => ctx.reply('Hey LOL'))

        next()
    }

    emitTelegramURL = async (req, res, next) => {
        if (!req.user) {
            await this.io.emit('action', { type: 'SOCKET_SERVER: NOT_LOGGED_IN', payload: null })
            return res.status(401).send({ error: 'You are not logged in!' })
        }

        await this.io.emit('action', {
            type: 'SOCKET_SERVER: LOGGED_IN',
            payload: this.#base64urlEncode(keys.TELEGRAM_SECRET_DEEP_LINK, req.body._id)
        })
        return
    }

    #base64urlEncode = (string, id) => {
        return base64url(`${string}=${id}`)
    }

    #base64urlDecode = (string) => {
        return base64url.decode(string)
    }
}

module.exports = TelegramController