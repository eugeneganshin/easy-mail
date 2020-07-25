const Markup = require('telegraf/markup')

exports.getBackKeyBoard = () => {
    const backKeyboardBack = '◀️ Back'
    const backKeyBoard = Markup.keyboard([backKeyboardBack]).resize().extra()

    return {
        backKeyBoard,
        backKeyboardBack
    }
}

exports.getMainKeyboard = () => {
    const mainKeyboardInfo = 'Info'
    const mainKeyboardHelp = 'Help'
    const mainKeyboardSurveys = 'Surveys'
    const mainkeyboardNewSurvey = 'Create New Survey'
    const mainkeyboardVisitWebpage = 'Visit webpage'

    let mainKeyboard = Markup.keyboard([
        [mainKeyboardInfo, mainKeyboardHelp],
        [mainKeyboardSurveys, mainkeyboardNewSurvey],
        [mainkeyboardVisitWebpage]
    ])

    mainKeyboard.resize().extra()

    return {
        mainKeyboard,
        mainKeyboardInfo,
        mainKeyboardHelp,
        mainKeyboardSurveys,
        mainkeyboardNewSurvey,
        mainkeyboardVisitWebpage
    }
}