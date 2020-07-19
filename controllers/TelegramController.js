const mongoose = require("mongoose");
const base64url = require('base64url')
const { MenuTemplate, MenuMiddleware, createBackMainMenuButtons } = require('telegraf-inline-menu')

const Survey = mongoose.model("surveys");
const Users = mongoose.model('Users')
const keys = require('../config/keys')

// NOTES:
// Remove deeplink from frontend as soon as we have user_chat_id in model
// Remove secret from DB aswell

class TelegramController {
    constructor(bot, io) {
        this.bot = bot
        this.io = io
    }

    // query for start
    handleReq = async (req, res, next) => {
        const link = req.body.message.text
        const chatId = req.body.message.chat.id
        console.log(req.body)

        if (req.body.message.text.startsWith('/start')) {
            const code = this.#extractUniqueCode(link)
            const decoded = await this.#base64urlDecode(code)
            const user = await this.#getUser(decoded)

            console.log(user, 'handleReq')
            // ? safe user to req.user or not ?
            if (user !== null) {
                const updatedUser = await Users.findByIdAndUpdate({ _id: user._id }, { telegramChatId: chatId })
                return next()
            }

            next()
        }

        next()

    }

    isLoggedIn = async (req, res, next) => {
        const chatId = req.body.message.chat.id

        const user = await Users.findOne({ telegramChatId: chatId })

        if (user) {
            console.log('WITH USER')
            req['user'] = user
            return next()
        }

        console.log('WITHOUT USER')
        this.bot.start((ctx) => ctx.reply(`Welcome traveller. I don't know you!`))
        return this.bot.handleUpdate(req.body, res)
    }

    start = async (req, res, next) => {
        /**
         * MENU STRUCTURE
         * 
         * [INFO], [HELP], [SHOW MY SURVEYS], [CREATE NEW SURVEY], [VISIT WEBPAGE]
         */
        // const { user } = req

        const menuTemplate = new MenuTemplate(ctx => `MENU\n`)

        this.#infoMenu(menuTemplate)
        this.#helpMenu(menuTemplate)
        this.#surveysMenu(menuTemplate)

        const menuMiddleware = new MenuMiddleware('/', menuTemplate)
        this.bot.start((ctx) => ctx.reply(`Welcome traveller. I know you!`))
        this.bot.command('menu', ctx => menuMiddleware.replyToContext(ctx))


        this.bot.use(menuMiddleware)
        return this.bot.handleUpdate(req.body, res)
    }

    #extractUniqueCode = (link) => {
        if (link.split(' ').length > 1) {
            return link.split(' ')[1]
        }

        return null
    }

    #getUser = async (secret) => {
        const user = await Users.findOne({ telegramSecret: secret })

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

    #infoMenu = (menu) => {
        return (
            menu.interact('INFO', 'info', {
                do: async ctx => {
                    await ctx.reply('Info')
                    return true
                }
            })
        )
    }

    #helpMenu = (menu) => {
        return (
            menu.interact('HELP', 'help', {
                joinLastRow: true,
                do: async ctx => {
                    await ctx.reply('help info')
                    return true

                    // You can return true to update the same menu or use a relative path
                    // For example '.' for the same menu or '..' for the parent menu
                    // return '.'
                }
            })
        )
    }

    #surveysMenu = async (menu, user) => {
        // const s = await this.#fetchSurveys(user)
        // console.log(s)

        return (
            menu.interact('MY SURVEYS', 'mysurveys', {
                joinLastRow: true,
                do: async ctx => {
                    await ctx.reply('surveys')
                    return true

                    // You can return true to update the same menu or use a relative path
                    // For example '.' for the same menu or '..' for the parent menu
                    // return '.'
                }
            })
        )
    }

    #fetchSurveys = async (user) => {
        const surveys = await Survey.find({ _user: user._id })
            .populate("_user")
            .select("-recipients");
        console.log(surveys)


        return surveys
    }

}

module.exports = TelegramController


// testing = async (req, res) => {
//     /**
//      * MENU STRUCTURE
//      * 
//      * [INFO], [HELP], [SHOW MY SURVEYS], [CREATE NEW SURVEY], [VISIT WEBPAGE]
//      */
//     const menuTemplate = new MenuTemplate(ctx => `Hey user!`)

//     this.#infoMenu(menuTemplate)
//     this.#helpMenu(menuTemplate)
//     this.#surveysMenu(menuTemplate)

//     const menuMiddleware = new MenuMiddleware('/', menuTemplate)
//     this.bot.command('menu', ctx => menuMiddleware.replyToContext(ctx))
//     this.bot.use(menuMiddleware)

//     return this.bot.handleUpdate(req.body, res)
// }