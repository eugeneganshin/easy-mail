const Composer = require('telegraf/composer')
const WizardScene = require('telegraf/scenes/wizard')

const locales = require('../../../locales/en')
const { backKeyboard, mainKeyboard } = require('../../../util/keyboard')
const validateEmails = require('../../../util/validateEmails')
const { sendSurveyAction } = require('./action')

const { scenes, shared, keyboards, other } = locales()

const stepHandler = new Composer()
const finalHandler = new Composer()

stepHandler.action(scenes.new_survey.cbQueryNew, (ctx) => {
    ctx.answerCbQuery()
    ctx.reply(scenes.new_survey.title)
    return ctx.wizard.next()
})

stepHandler.command('create', (ctx) => {
    ctx.reply(scenes.new_survey.title)
    return ctx.wizard.next()
})

stepHandler.use(async (ctx) => {
    await ctx.replyWithMarkdown(`Press 'Create new survey' button or type /create`)
})

finalHandler.action('yes', sendSurveyAction)

finalHandler.action('no', async (ctx) => {
    await ctx.answerCbQuery()
    await ctx.reply('NO LOGIC')
    return ctx.scene.reenter()
})

const newSurvey = new WizardScene('newSurvey',
    // 1) Introduce logic
    async (ctx) => {
        await ctx.reply(scenes.new_survey.additional_message, backKeyboard)
        await ctx.reply(scenes.new_survey.message, scenes.new_survey.buton)

        return ctx.wizard.next()
    },
    stepHandler,
    // 2) Save title
    (ctx) => {
        if (ctx.message) ctx.wizard.state['title'] = ctx.message.text
        ctx.reply(scenes.new_survey.subject)

        return ctx.wizard.next()
    },
    // 3) Save subject
    (ctx) => {
        if (ctx.message) ctx.wizard.state['subject'] = ctx.message.text
        ctx.reply(scenes.new_survey.body)

        return ctx.wizard.next()
    },
    // 4) Save body
    (ctx) => {
        if (ctx.message) ctx.wizard.state['body'] = ctx.message.text
        ctx.reply(scenes.new_survey.recipients)

        return ctx.wizard.next()
    },
    // 5) Show result
    async (ctx) => {
        let recipients
        if (ctx.message) {
            recipients = ctx.message.text
            ctx.wizard.state['recipients'] = recipients
        }
        const { title, subject, body } = ctx.wizard.state

        // If invalid emails, start current step again.
        const invalidEmails = await validateEmails(recipients)
        if (invalidEmails) {
            ctx.replyWithMarkdownV2(invalidEmails)
            ctx.wizard.back()
            return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        }

        const resultMessage = `TITLE:\n${title}\n\nSUBJECT:\n${subject}\n\nBODY:\n${body}\n\nRECIPIENTS:\n${recipients}\n`
        ctx.reply(resultMessage)
        ctx.reply(scenes.new_survey.choice, scenes.new_survey.resultButtons)

        return ctx.wizard.next()
    },
    finalHandler
)

newSurvey.use((ctx, next) => {
    console.log(ctx.wizard.cursor)
    return next()
})

newSurvey.hears(keyboards.back_keyboard.back, (ctx) => {
    ctx.reply(shared.what_next, mainKeyboard)

    return ctx.scene.leave()
})

module.exports = newSurvey