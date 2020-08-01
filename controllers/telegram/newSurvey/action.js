const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const User = mongoose.model('Users')

const Mailer = require('../../../services/Mailer')
const surveyTemplate = require('../../../services/emailTemplates/suveyTemplate')
const locales = require('../../../locales/en')
const { backKeyboard, mainKeyboard } = require('../../../util/keyboard')

const { scenes, shared, keyboards, other } = locales()

exports.sendSurveyAction = async (ctx) => {
    await ctx.answerCbQuery()
    const user = await User.findOne({ telegramChatId: ctx.update.callback_query.from.id })

    const { title, subject, body, recipients } = ctx.wizard.state

    const survey = new Survey({
        title,
        subject,
        body,
        _user: user._id,
        recipients: recipients
            .split(",")
            .map((email) => ({ email: email.trim() })),
        dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey))

    try {
        await mailer.send();
        await survey.save();
        user.credits -= 1
        await user.save()
    } catch (error) {
        console.log(error)
        ctx.reply('Something wrong has happened. Try again later.', mainKeyboard)
        return await ctx.scene.leave()
    }

    await ctx.reply('YES LOGIC')
    return await ctx.scene.leave()
}