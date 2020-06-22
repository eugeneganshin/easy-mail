const express = require('express')
const passport = require('passport')

const router = express.Router()

router.route('/').get(
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

router
  .route('/callback')
  .get(passport.authenticate('google'), (req, res) => {
    res.redirect('/surveys')
  })

router.get('/logout', (req, res) => {
  req.logout()
  res.send(req.user)
})

module.exports = router

// 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

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
