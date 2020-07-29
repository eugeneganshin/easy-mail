const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const locales = require('../../../locales/en')
const { backKeyboard, mainKeyboard } = require('../../../util/keyboard')

const { scenes, shared, keyboards, other } = locales()

const { leave } = Stage
const contact = new Scene('contactScene')

contact.enter(async (ctx) => {
    await ctx.reply(scenes.contact.write_to_the_creator, backKeyboard)
})

contact.leave(async (ctx) => {
    await ctx.reply(shared.what_next, mainKeyboard)
})

// command,hears,action
contact.action('saveme', leave())
contact.hears(keyboards.back_keyboard.back, leave())

module.exports = contact