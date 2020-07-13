const mongoose = require("mongoose");
const base64url = require('base64url')

const Survey = mongoose.model("surveys");
const Users = mongoose.model('Users')
const keys = require('../config/keys')

class TelegramController {
    constructor(bot, io) {
        this.bot = bot
        this.io = io
    }

    handleDeepLink = async (req, res, next) => {
        // check the string for secret_key

        if (req.body.message.text.startsWith('/start')) {
            console.log(req.body.message.text)

            this.#analyseLink(req.body.message.text)

            // const message = req.body.message.text
            // const hash = message.split(' ')[1]
            // const decoded = await this.#base64urlDecode(hash)
            // const userId = decoded.split('=')[1]

            // const user = await Users.findById(userId)

            // // TODO: record telegram_chat_id for the user.
            // // console.log(user)
            // req['user'] = user

            next()
        }

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
        console.log(link)
        return
        // const link = message.split(' ')[1]
        // const decoded = await this.#base64urlDecode(hash)
        // const userId = decoded.split('=')[1]
    }

    #base64urlEncode = async (string, id) => {
        return await base64url(`${string}=${id}`)
    }

    #base64urlDecode = async (string) => {
        return await base64url.decode(string)
    }
}

module.exports = TelegramController