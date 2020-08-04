const passport = require('passport');
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.GOOGLE_CLIENT_ID,
			clientSecret: keys.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			const currentUser = await User.findOne({ googleId: profile.id });

			if (currentUser) {
				return done(null, currentUser);
			}

			// generate random secret string
			const secret = await crypto.randomBytes(20).toString('hex');

			const user = await new User({ googleId: profile.id, telegramSecret: secret }).save();
			done(null, user);
		}
	)
);
