require('dotenv').config()
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const { Telegraf } = require('telegraf')
require('./models/userModel')
require('./models/surveyModel')
require('./services/passport')

const keys = require('./config/keys')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const surveyRouter = require('./routes/surveyRoutes')
const { requiredPaths } = require('./models/recipientModel')

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
app.set('io', io)
app.use(cors())
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 30,
    keys: [keys.COOKIE_KEY],
  }),
)
app.use(passport.initialize())
app.use(passport.session())

// BOT
const bot = new Telegraf(keys.TELEGRAM_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.launch()
// BOT

// SOCKET
io.on('connect', (socket) => {
  console.log('Connected')
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
})


// SOCKET

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

server.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`),
)

// TODO: telegram API, socket.io
