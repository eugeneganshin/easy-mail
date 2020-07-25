require('dotenv').config()
const express = require('express');
const app = express();
const server = require('http').createServer(app);

require('./core/db')

require('./models/userModel')
require('./models/surveyModel')
require('./services/passport')

const createRoutes = require('./core/routes')
const createSocket = require('./core/socket')
const bot = require('./core/telegram')

const io = createSocket(server)

createRoutes(app, io, bot)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`))