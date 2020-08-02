class CreditsController {
	constructor(stripe) {
		this.stripe = stripe;
	}

	isEnoughCredits = (req, res, next) => {
		if (req.user.credits < 1) {
			return res.status(401).send({ error: 'Not enough credits!' });
		}

		next();
	};

	addCredits = async (req, res) => {
		await this.stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '5$ for 5 credits',
			source: req.body.id,
		});

		req.user.credits += 5;
		const user = await req.user.save(); // saves to DB

		res.send(user);
	};
}

module.exports = CreditsController;
