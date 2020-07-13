const base64url = require('base64url')

const keys = require('../config/keys')

class SocketioController {
    constructor(bot, io) {
        this.bot = bot
        this.io = io
    }

    emitTelegramURL = async (req, res, next) => {
        // The best thing would be to generate the key with memcashe
        if (!req.user) {
            await this.io.emit('action', { type: 'SOCKET_SERVER: NOT_LOGGED_IN', payload: null })
            return res.status(401).send({ error: 'You are not logged in!' })
        }

        await this.io.emit('action', {
            type: 'SOCKET_SERVER: LOGGED_IN',
            payload: this.#base64urlEncode(keys.TELEGRAM_SECRET_DEEP_LINK, req.user._id)
        })

        return
    }


    #base64urlEncode = (string, id) => {
        return base64url(`${string}=${id}`)
    }
}

module.exports = SocketioController