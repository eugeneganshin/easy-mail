const mongoose = require('mongoose')

const asyncWrapper = require('../../util/errorHandler')

const User = mongoose.model('Users')

const isLoggedin = async (ctx, next) => {
    const userid = ctx.from.id
    console.log(ctx)

    try {
        const user = await User.findOne({ telegramChatId: userid })
        if (user) {
            await next(ctx)
        } else {
            await ctx.reply(`You are unauthorized!\n`)
            await ctx.scene.enter('unauthorized')
        }
    } catch (error) {
        console.error(error)
        await ctx.reply('Something went wrong!')
        await next(ctx)
    }
}

// const isLoggedin = asyncWrapper(async (ctx, next) => {
//     const userid = ctx.from.id

//     const user = await User.findOne({ telegramChatId: userid })
//     if (user) {
//         console.log('test')
//         await next(ctx)
//     } else {
//         ctx.reply(`I don't know you! Please, visit out website first...\n`)
//         // ctx enter scene
//         ctx.scene.enter('unauthorized')
//     }
// })

module.exports = isLoggedin