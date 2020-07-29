const mongoose = require('mongoose')
const base64url = require('base64url')
const User = mongoose.model('Users')

exports.isLoggedin = async (ctx, next) => {
    const uid = ctx.from.id
    const payload = ctx.startPayload
    const decoded = await base64url.decode(payload)

    const user = await User.findOne({ telegramChatId: uid })
    const newUser = await User.findOneAndUpdate({ telegramSecret: decoded }, { telegramChatId: uid })


    if (newUser) {
        ctx.session['user'] = newUser
        return next(ctx)
    } else if (user) {
        return next(ctx)
    } else {
        ctx.reply(`i Don't Know You, visit site and comeback!`)
    }
}