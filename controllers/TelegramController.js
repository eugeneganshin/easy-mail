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
    handleDeepLink = async (req, res, next) => {

        // query for /start and hash
        if (req.body.message.text.startsWith('/start')) {
            // if start and hash, and hash matches KEYS
            // record user_chat_id to the model
            // start scene as logged in user
            // req['user'] = user

            const c = await this.#analyseLink(req.body.message.text)
            console.log(c)

            next()
        }

        // any query
        // check if incomming user has user_chat_id

        next()

    }

    isLoggedIn = async (req, res, next) => {
        //check req.user or telegram_chat_id
        next()
    }

    startBot = async (req, res) => {
        if (req.user) {
            return this.#startBotWithUser(req, res)
        }

        return this.#startBotNoUser(req, res)
    }

    #startBotWithUser = async (req, res) => {
        console.log(req.user, 'WITH USER')
        res.status(200)
        this.bot.start((ctx) => ctx.reply('Welcome USER'))
        this.bot.hears('hi', (ctx) => ctx.reply('Hey there'))
        return this.bot.handleUpdate(req.body, res)
    }

    #startBotNoUser = async (req, res) => {
        console.log(req.user, 'WITHOUT USER')
        res.status(200)
        this.bot.start((ctx) => ctx.reply('Welcome'))
        this.bot.hears('hi', (ctx) => ctx.reply('Hey there'))
        return this.bot.handleUpdate(req.body, res)
    }

    #analyseLink = async (link) => {
        // YXJhbmRvbXRlbGVncmFtc3RyaW5nPTVlZjBkNjYzN2YwZWEwMWEzYzgzZmM4Yw
        console.log(link)
        const hash = link.split(' ')[1]
        const decoded = await this.#base64urlDecode(hash)
        const secret = decoded.split('=')[0]
        if (secret.trim() === keys.TELEGRAM_SECRET_DEEP_LINK) {
            return true
        }

        return false
    }

    #base64urlEncode = async (string, id) => {
        return await base64url(`${string}=${id}`)
    }

    #base64urlDecode = async (string) => {
        return await base64url.decode(string)
    }
}

module.exports = TelegramController