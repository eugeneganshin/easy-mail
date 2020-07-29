const middleware = async (ctx, next) => {
    ctx.question = async (text, options) => {
        await ctx.reply(text)
    }

    next()
}

module.exports = middleware
