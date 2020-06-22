const express = require('express')
const keys = require('../config/keys')
const stripe = require('stripe')(keys.STRIPE_SECRET_KEY)

const authC = require('../controllers/authControll')

const router = express.Router()

router.route('/current_user').get((req, res) => {
  res.send(req.user)
})

router.route('/stripe').post(authC.isLogedIn, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '5$ for 5 credits',
    source: req.body.id,
  })

  req.user.credits += 5
  const user = await req.user.save() // saves to DB

  res.send(user)
})

module.exports = router
