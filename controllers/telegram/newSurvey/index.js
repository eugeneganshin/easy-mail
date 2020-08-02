const Composer = require('telegraf/composer');
const WizardScene = require('telegraf/scenes/wizard');

const locales = require('../../../locales/en');

const { mainKeyboard } = require('../../../util/keyboard');
const actions = require('./action');

const { scenes, shared, keyboards } = locales();

const stepHandler = new Composer();
const finalHandler = new Composer();

stepHandler.action(scenes.new_survey.cbQueryNew, actions.getTitleAction);
stepHandler.command('create', actions.getTitleCommand);
stepHandler.use(actions.infoOnInputAction);

finalHandler.action('yes', actions.sendSurveyAction);
finalHandler.action('no', actions.startAgainAction);

const newSurvey = new WizardScene(
	'newSurvey',
	actions.enterAction,
	stepHandler,
	actions.getSubjectAction,
	actions.getBodyAction,
	actions.getRecipientsAction,
	actions.showResultAction,
	finalHandler
);

newSurvey.hears(keyboards.back_keyboard.back, (ctx) => {
	ctx.reply(shared.what_next, mainKeyboard);

	return ctx.scene.leave();
});

module.exports = newSurvey;
