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