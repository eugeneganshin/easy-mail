const mongoose = require("mongoose");
const base64url = require('base64url')

const Survey = mongoose.model("surveys");
const Users = mongoose.model('Users')
const keys = require('../config/keys')

// NOTES:
// Remove deeplink from frontend as soon as we have user_chat_id in model

class TelegramController {
    constructor(bot, io) {
        this.bot = bot
        this.io = io
    }

    // query for start
    onStart = async (req, res, next) => {
        const link = req.body.message.text

        if (req.body.message.text.startsWith('/start')) {
            const code = this.#extractUniqueCode(link)
            const decoded = await this.#base64urlDecode(code)
            const user = await this.#getUser(decoded)

            // ? safe user to req.user or not ?
            if (user !== null) {
                const found = await Users.findByIdAndUpdate({ _id: user._id }, { telegramChatId: chatId })
                console.log(found, 'IF')
                return next()
            }

            next()
        }

        next()

    }

    isLoggedIn = async (req, res, next) => {
        const chatId = req.body.message.chat.id

        const user = await Users.findOne({ telegramChatId: chatId })

        if (user !== null) {
            return this.#startBotWithUser(req, res)
        }

        return this.#startBotNoUser(req, res)
    }

    #startBotWithUser = async (req, res) => {
        console.log(req.user, 'WITH USER')
        res.status(200)
        this.bot.start((ctx) => ctx.reply('Welcome USER'))
        this.bot.hears('hi', (ctx) => ctx.reply('Hey there'))
        this.bot.hears('a', (ctx) => ctx.reply('Hey there'))
        return this.bot.handleUpdate(req.body, res)
    }

    #startBotNoUser = async (req, res) => {
        console.log(req.user, 'WITHOUT USER')
        res.status(200)
        this.bot.start((ctx) => ctx.reply('Welcome'))
        this.bot.hears('hi', (ctx) => ctx.reply('Hey there'))
        this.bot.hears('a', (ctx) => ctx.reply('Hey there'))
        return this.bot.handleUpdate(req.body, res)
    }

    #extractUniqueCode = (link) => {
        if (link.split(' ').length > 1) {
            return link.split(' ')[1]
        }

        return null
    }

    #getUser = async (secret) => {
        const user = await Users.findOne({ telegramSecret: secret }, function (err) {
            console.error(err, 'getUser ERROR')
            return null
        })

        if (user !== null) {
            return user
        } else {
            return null
        }
    }

    #base64urlEncode = async (string, id) => {
        return await base64url(`${string}=${id}`)
    }

    #base64urlDecode = async (string) => {
        if (string === null) return null
        return await base64url.decode(string)
    }
}

module.exports = TelegramController