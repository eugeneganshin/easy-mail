require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
require('./models/userModel')
require('./models/surveyModel')
require('./services/passport')

const keys = require('./config/keys')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const surveyRouter = require('./routes/surveyRoutes')

mongoose
  .connect(keys.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection is successfull')
  })

// GLOBAL MIDDLEWARE
const app = express()
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 30,
    keys: [keys.COOKIE_KEY],
  }),
)
app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 5000

app.use('/api/', userRouter)
app.use('/auth/google', authRouter)
app.use('/api/surveys', surveyRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`),
)
