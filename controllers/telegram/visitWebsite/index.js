const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const { backKeyboard, testKeyboard } = require('../../../util/keyboard')

const replies = {
    enter: 'Official site',
    leave: `✋ Hey, what are you up to?`,
    website: {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'easymail', url: 'https://easymail.com' }
                ]
            ]
        }
    },
    sticker: 'CAACAgEAAxkBAAIH1l8d70PLrLrGBDryPUZrFf1K0UyUAAKxCAACv4yQBGXO3y8nkM42GgQ'
}

const { leave } = Stage
const visitScene = new Scene('visitWebsiteScene')

visitScene.enter(async (ctx) => {
    await ctx.reply(replies.enter, replies.website)
    await ctx.replyWithSticker(replies.sticker, backKeyboard)
})

visitScene.leave(async (ctx) => {
    await ctx.reply(replies.leave, testKeyboard)
})

// command,hears,action
visitScene.command('back', leave())
visitScene.hears('◀️ BACK', leave())
visitScene.action('saveme', leave())

module.exports = visitScene