const { Telegraf } = require('telegraf')
const { MenuTemplate, MenuMiddleware, createBackMainMenuButtons } = require('telegraf-inline-menu')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const keys = require('../config/keys')

const startScene = require('../controllers/telegram/start')
const aboutScene = require('../controllers/telegram/about')
const unauthorizedScene = require('../controllers/telegram/unauthorized')

const isLoggedin = require('../middleware/telegram/isLoggedin')
const asyncWrapper = require('../util/errorHandler')

const { leave } = Stage

const stage = new Stage()

stage.command('cancel', leave())
stage.register(unauthorizedScene)
stage.register(startScene)

const bot = new Telegraf(keys.TELEGRAM_TOKEN)

bot.use(session())
bot.use(stage.middleware())
// bot.use(isLoggedin)
// bot.use(async (ctx, next) => {
//     console.log('middleware')
//     await next()
// })

bot.start(asyncWrapper(async (ctx) => ctx.scene.enter('start')))



bot.on('message', ctx => ctx.reply('something wrong '))

module.exports = bot


// https://t.me/mybot?start=parameter deep link in frontend
// backend webhook for handling it
// depending on a link telegram should know if the user is authenticated
// if authenticated add the telegram username to DB
// check db before sending anydata!

/*
*    MENU STRUCTURE:
*
*    [INFO], [HELP], [SHOW MY SURVEYS], [CREATE NEW SURVEY], [VISIT WEBPAGE]
*/

// const menu = new MenuTemplate((ctx) => 'Main Menu\n')


// // INTERACT
// menu.interact('INFO', 'info', {
//     do: async ctx => {
//         await ctx.reply('Info')
//         return true
//     }
// })

// // INTERACT AND UPDATE
// menu.interact('HELP', 'help', {
//     joinLastRow: true,
//     do: async ctx => {
//         await ctx.answerCbQuery('help info')
//         return true

//         // You can return true to update the same menu or use a relative path
//         // For example '.' for the same menu or '..' for the parent menu
//         // return '.'
//     }
// })

// menu.interact('Create New Survey', 'create', {
//     do: async ctx => {
//         await ctx.answerCbQuery('create new survey')
//         return true

//         // You can return true to update the same menu or use a relative path
//         // For example '.' for the same menu or '..' for the parent menu
//         // return '.'
//     }
// })

// menu.url('Visit Webpage', 'https://d7dd12cb267b.ngrok.io/')
// // menu.interact('Visit Webpage', 'webpage', {
// //     do: async ctx => {
// //         await ctx.answerCbQuery('page')
// //         return true

// //         // You can return true to update the same menu or use a relative path
// //         // For example '.' for the same menu or '..' for the parent menu
// //         // return '.'
// //     }
// // })




// ======================================== //

// // ERRORS
// bot.catch(error => {
//     console.log('telegraf error', error.response, error.parameters, error.on || error)
// })

// const menuMiddleware = new MenuMiddleware('/', menu)
// bot.command('start', ctx => {
//     console.log(ctx)
//     return menuMiddleware.replyToContext(ctx)
// })
// bot.use((ctx, next) => {
//     if (ctx.callbackQuery) {
//         console.log('callback data just happened', ctx.callbackQuery.data)
//     }

//     return next()
// })
// bot.use(menuMiddleware)

// bot.launch()



// // SELECT SOMETHING
// let selectedKey = 'b'
// menu.select('select', ['A', 'B', 'C'], {
//     set: async (ctx, key) => {
//         selectedKey = key
//         await ctx.answerCbQuery(`you selected ${key}`)
//         return true
//     },
//     isSet: (_, key) => key === selectedKey
// })



// // TOGGLE SOMETHING
// let mainMenuToggle = false
// menu.toggle('toggle me', 'toggle me', {
//     set: (_, newState) => {
//         mainMenuToggle = newState
//         return true
//     },
//     isSet: () => mainMenuToggle
// })

// // SUBMENU WITH LOGIC
// const foodMenu = new MenuTemplate('People like food. What do they like?')

// const people = { Mark: {}, Paul: {} }
// const food = ['bread', 'cake', 'bananas']

// function personButtonText(_, key) {
//     const entry = people[key]
//     if (entry.food) {
//         return `${key} (${entry.food})`
//     }

//     return key
// }

// function foodSelectText(ctx) {
//     const person = ctx.match[1]
//     const hisChoice = people[person].food
//     if (!hisChoice) {
//         return `${person} is still unsure what to eat.`
//     }

//     return `${person} likes ${hisChoice} currently.`
// }

// const foodSelectSubmenu = new MenuTemplate(foodSelectText)

// foodSelectSubmenu.toggle('Prefer tea', 'tea', {
//     set: (ctx, choice) => {
//         const person = ctx.match[1]
//         people[person].tee = choice
//         return true
//     },
//     isSet: ctx => {
//         const person = ctx.match[1]
//         return people[person].tee === true
//     }
// })
// foodSelectSubmenu.select('food', food, {
//     set: (ctx, key) => {
//         const person = ctx.match[1]
//         people[person].food = key
//         return true
//     },
//     isSet: (ctx, key) => {
//         const person = ctx.match[1]
//         return people[person].food === key
//     }
// })
// foodSelectSubmenu.manualRow(createBackMainMenuButtons())
// foodMenu.chooseIntoSubmenu('person', () => Object.keys(people), foodSelectSubmenu, {
//     buttonText: personButtonText,
//     columns: 2
// })
// foodMenu.manualRow(createBackMainMenuButtons())

// menu.submenu('Food menu', 'food', foodMenu, {
//     hide: () => mainMenuToggle
// })


// // SUBMENU WITH VIDEO
// let mediaOption = 'photo1'
// const mediaMenu = new MenuTemplate(() => {
//     if (mediaOption === 'video') {
//         return {
//             type: 'video',
//             media: 'https://telegram.org/img/t_main_Android_demo.mp4',
//             text: 'Just a caption for a video'
//         }
//     }

//     if (mediaOption === 'animation') {
//         return {
//             type: 'animation',
//             media: 'https://telegram.org/img/t_main_Android_demo.mp4',
//             text: 'Just a caption for an animation'
//         }
//     }

//     if (mediaOption === 'photo2') {
//         return {
//             type: 'photo',
//             media: 'https://telegram.org/img/SiteAndroid.jpg',
//             text: 'Just a caption for a *photo*',
//             parse_mode: 'Markdown'
//         }
//     }

//     if (mediaOption === 'document') {
//         return {
//             type: 'document',
//             media: 'https://telegram.org/file/464001088/1/bI7AJLo7oX4.287931.zip/374fe3b0a59dc60005',
//             text: 'Just a caption for a <b>document</b>',
//             parse_mode: 'HTML'
//         }
//     }

//     if (mediaOption === 'just text') {
//         return {
//             text: 'Just some text'
//         }
//     }

//     return {
//         type: 'photo',
//         media: 'https://telegram.org/img/SiteiOs.jpg'
//     }
// })
// mediaMenu.interact('Just a button', 'randomButton', {
//     do: async ctx => {
//         await ctx.answerCbQuery('Just a callback query answer')
//         return false
//     }
// })
// mediaMenu.select('type', ['animation', 'document', 'photo1', 'photo2', 'video', 'just text'], {
//     columns: 2,
//     isSet: (_, key) => mediaOption === key,
//     set: (_, key) => {
//         mediaOption = key
//         return true
//     }
// })
// mediaMenu.manualRow(createBackMainMenuButtons())

// menu.submenu('Media Menu', 'media', mediaMenu)