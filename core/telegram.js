const { Telegraf } = require('telegraf')
const { MenuTemplate, MenuMiddleware, createBackMainMenuButtons } = require('telegraf-inline-menu')
const keys = require('../config/keys')

const bot = new Telegraf(keys.TELEGRAM_TOKEN)


/*a
* 1) Create a bot with a suitable username, e.g. @ExampleComBot
* 2) Set up a webhook for incoming messages
* 3) Generate a random string of a sufficient length, e.g. $memcache_key = "vCH1vGWJxfSeofSAs0K5PA"
* 4) Put the value 123 with the key $memcache_key into Memcache for 3600 seconds (one hour)
* 5) Show our user the button https://t.me/ExampleComBot?start=vCH1vGWJxfSeofSAs0K5PA
* 6) Configure the webhook processor to query Memcached with the parameter that is passed in incoming messages beginning with /start. If the key exists, record the chat_id passed to the webhook as telegram_chat_id for the user 123. Remove the key from Memcache.
* 7) Now when we want to send a notification to the user 123, check if they have the field telegram_chat_id. If yes, use the sendMessage method in the Bot API to send them a message in Telegram.
*/


// TG WEBHOOK
bot.telegram.setWebhook('https://929bcfde43b8.ngrok.io/telegram')
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