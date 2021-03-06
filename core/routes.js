const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');
const path = require('path');

const keys = require('../config/keys');
const stripe = require('stripe')(keys.STRIPE_SECRET_KEY);

const {
	AuthController,
	CreditsController,
	SocketioController,
	SurveyController,
	TelegramController,
	WebhookController,
} = require('../controllers');

const createRoutes = (app, io, bot) => {
	// CONTROLLERS
	AuthC = new AuthController();
	CreditsC = new CreditsController(stripe);
	SurveyC = new SurveyController();
	TelegramC = new TelegramController(bot);
	WebhookC = new WebhookController(io);
	SocketioC = new SocketioController(io);

	// MIDDLEWARE

	app.use(cors());
	app.use(bodyParser.json());
	app.use(
		cookieSession({
			maxAge: 1000 * 60 * 60 * 24 * 30,
			keys: [keys.COOKIE_KEY],
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());
	// USER ROUTES
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
	app.post('/api/stripe', AuthC.isLogedIn, CreditsC.addCredits);

	// PASSPORT ROUTES
	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
	app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
		res.redirect('/surveys');
	});
	app.get('/auth/google/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	// SURVEY ROUTES
	app.get('/api/surveys', AuthC.isLogedIn, SurveyC.getSurvey, SocketioC.emitTelegramURL);
	app.post('/api/surveys', AuthC.isLogedIn, CreditsC.isEnoughCredits, SurveyC.newSurvey);
	app.post('/api/surveys/webhook', WebhookC.getChoice);
	app.get('/api/surveys/:id/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	// TELEGRAM WEBHOOK
	const cb = `/${keys.TELEGRAM_TOKEN.split(':')[1]}`;

	app.post(cb, TelegramC.handleWebhook);
	app.use(bot.webhookCallback(cb));
	bot.telegram.setWebhook(`https://ff21ba0c24a9.ngrok.io${cb}`);
};

module.exports = createRoutes;
