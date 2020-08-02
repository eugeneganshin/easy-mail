const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/suveyTemplate');

class SurveyController {
	constructor(io, bot) {
		this.io = io;
		this.bot = bot;
	}

	getSurvey = async (req, res, next) => {
		const surveys = await Survey.find({ _user: req.user.id })
			.populate('_user')
			.select('-recipients');

		console.log(surveys);
		res.send(surveys);
		next();
	};

	newSurvey = async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			_user: req.user.id,
			recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
			dateSent: Date.now(),
		});

		// SENDGRID
		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			await mailer.send();

			// DB
			await survey.save();

			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (error) {
			res.status(422).send(error);
		}
	};
}

module.exports = SurveyController;
