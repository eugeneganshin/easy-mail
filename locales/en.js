const locales = () => {
    const scenes = {
        start: {
            welcome_back: "Glad to see you back!",
            new_account: "Account has been created successfully! Before start doing stuff with me, please read a short instruction about who I am and how I can help you 😊",
            bot_description: "<b>🔻 I'm currently in open beta test and under heavy development. Therefore, errors may occur. Do not hesitate to contact the Creator from under ✍️ Contact section\n\n</b>🔻 My name is EasyMail and I will help you send email.",
            lets_go: "Let's go!"
        },
        about: {
            main: "Hey! Thanks for activating me!\n",
            enter: "I am a small SPA application that sends email via SendGrid."
        },
        contact: {
            write_to_the_creator: "🤔 Here you can leave a message for the Creator! Be wise though, try to express your minds fully and clearly within one message!",
            message_delivered: "📬 Your message has been delivered!"
        },
        surveys: {
            test: 'ENTER SURVEYS SCENE'
        },
        new_survey: {
            message: `I will help you with creating new surveys. Please press the button to start.`,
            additional_message: 'You will be able to start again if the survey is wrong.',
            buton: {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Create new survey', callback_data: 'create-new-survey' }
                        ]
                    ]
                }
            },
            backButton: {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Back', callback_data: 'back' }
                        ]
                    ]
                }
            },
            resultButtons: {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Yes', callback_data: 'yes' },
                            { text: 'No', callback_data: 'no' }
                        ]
                    ]
                }
            },
            cbQueryNew: 'create-new-survey',
            cbQueryBack: 'back',
            title: 'Enter a title of the mail',
            subject: 'Enter a subject of the mail',
            body: 'Enter a body of the mail',
            recipients: 'Enter a list of recipients.\nExample: johndoe@gmail.com, janedoe@yahoo.com, etc.',
            choice: 'Happy with the result?',
            test: 'ENTER NEW SURVEY SCENE',
        },
        visit_website: {
            message: 'Official site',
            sticker: 'CAACAgEAAxkBAAIH1l8d70PLrLrGBDryPUZrFf1K0UyUAAKxCAACv4yQBGXO3y8nkM42GgQ',
            button: {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'easymail', url: 'https://easymail.com' }
                        ]
                    ]
                }
            }
        }
    }

    const shared = {
        what_next: "✋ Hey, what are you up to?",
        something_went_wrong: "❌ Something went wrong. Try one more time..",
        sticker: 'CAACAgEAAxkBAAIH1l8d70PLrLrGBDryPUZrFf1K0UyUAAKxCAACv4yQBGXO3y8nkM42GgQ'
    }

    const keyboards = {
        back_keyboard: {
            back: "◀️ Back"
        },
        main_keyboard: {
            surveys: "👀 Show my surveys",
            new_survey: "📝 Create new survey",
            about: "❓ About",
            contact: "✍️ Contact",
            website: "📱 Visit website"
        }
    }

    const other = {
        default_handler: "🚧 Hey, please choose a section with the Telegram keyboard before typing anything"
    }

    return {
        scenes,
        shared,
        keyboards,
        other
    }
}

module.exports = locales